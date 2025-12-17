/**
 * GitHub Data Service - Complete Replacement
 *
 * INSTRUCTIONS:
 * 1. Copy this entire file
 * 2. Replace your existing github service file in Loveable
 * 3. Update imports in components that use it
 *
 * Features:
 * - 1-hour cache (prevents rate limiting)
 * - Better LOC estimates per language
 * - Fallback to stale cache on API errors
 * - Rate limit monitoring
 */

const GITHUB_USERNAME = "hadiyaqoobi";
const CACHE_KEY = "github_stats_cache";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// ============================================
// TYPES
// ============================================

interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  html_url: string;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubStats {
  total_repos: number;
  total_commits: number;
  lines_added: number;
  lines_removed: number;
  net_lines_of_code: number;
  languages_count: number;
  most_active_year: number;
  last_updated: string;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  bytes: number;
  color: string;
}

export interface RepoStat {
  name: string;
  commits: number;
  language: string;
  stars: number;
  url: string;
}

interface CachedData {
  timestamp: number;
  summary: GitHubStats;
  languages: LanguageStat[];
  topRepos: RepoStat[];
}

// ============================================
// LANGUAGE COLORS (Official GitHub colors)
// ============================================

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#2b7489",
  JavaScript: "#f1e05a",
  SQL: "#e38c00",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  "C#": "#239120",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#ffac45",
  Kotlin: "#F18E33",
  Shell: "#89e051",
  PowerShell: "#012456",
  "Jupyter Notebook": "#DA5B0B",
  Vue: "#41b883",
  Dart: "#00B4AB",
  YAML: "#cb171e",
  Dockerfile: "#384d54",
};

// Better LOC estimates (bytes per line by language)
const LOC_RATIOS: Record<string, number> = {
  Python: 35,
  JavaScript: 30,
  TypeScript: 32,
  Java: 40,
  "C++": 38,
  "C#": 40,
  Go: 28,
  Rust: 35,
  Ruby: 25,
  PHP: 35,
  HTML: 45,
  CSS: 30,
  SQL: 50,
  Shell: 30,
  "Jupyter Notebook": 100,
  default: 35,
};

// ============================================
// CACHE FUNCTIONS
// ============================================

const getCache = (): CachedData | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data: CachedData = JSON.parse(cached);
    const age = Date.now() - data.timestamp;

    if (age < CACHE_TTL_MS) {
      console.log(`📦 Using cached GitHub data (${Math.round(age / 60000)} min old)`);
      return data;
    }

    console.log("⏰ Cache expired");
    return null;
  } catch {
    return null;
  }
};

const setCache = (summary: GitHubStats, languages: LanguageStat[], topRepos: RepoStat[]) => {
  try {
    const data: CachedData = {
      timestamp: Date.now(),
      summary,
      languages,
      topRepos,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    console.log("💾 GitHub data cached for 1 hour");
  } catch (error) {
    console.warn("Failed to cache:", error);
  }
};

const getStaleCache = (): CachedData | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const estimateLOC = (sizeKB: number, language: string | null): number => {
  const ratio = LOC_RATIOS[language || "default"] || LOC_RATIOS.default;
  return Math.round((sizeKB * 1024) / ratio);
};

const getColor = (language: string): string => {
  return LANGUAGE_COLORS[language] || "#858585";
};

// ============================================
// MAIN FETCH FUNCTION
// ============================================

export const fetchGitHubData = async () => {
  // 1. Check cache first
  const cached = getCache();
  if (cached) {
    return {
      summary: cached.summary,
      languages: cached.languages,
      topRepos: cached.topRepos,
    };
  }

  console.log("🔄 Fetching fresh GitHub data...");

  try {
    // 2. Fetch from GitHub API
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
    ]);

    // Check rate limit
    const remaining = reposRes.headers.get("X-RateLimit-Remaining");
    if (remaining) {
      console.log(`📊 API calls remaining: ${remaining}/60`);
      if (parseInt(remaining) < 10) {
        console.warn("⚠️ Low rate limit!");
      }
    }

    if (!reposRes.ok) {
      if (reposRes.status === 403) {
        throw new Error("Rate limit exceeded");
      }
      throw new Error(`API error: ${reposRes.status}`);
    }

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();

    // 3. Calculate language stats
    const languageBytes: Record<string, number> = {};
    let totalBytes = 0;
    let totalLOC = 0;

    for (const repo of repos) {
      if (repo.language && repo.size > 0) {
        const bytes = repo.size * 1024;
        languageBytes[repo.language] = (languageBytes[repo.language] || 0) + bytes;
        totalBytes += bytes;
        totalLOC += estimateLOC(repo.size, repo.language);
      }
    }

    const languages: LanguageStat[] = Object.entries(languageBytes)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: Math.round((bytes / totalBytes) * 1000) / 10,
        color: getColor(name),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    // 4. Get top repos
    const topRepos: RepoStat[] = repos
      .filter((r) => r.language)
      .sort((a, b) => b.size - a.size)
      .slice(0, 4)
      .map((repo) => ({
        name: repo.name,
        commits: Math.max(1, Math.round(repo.size / 2)), // Better estimate
        language: repo.language || "Unknown",
        stars: repo.stargazers_count,
        url: repo.html_url,
      }));

    // 5. Find most active year
    const yearCounts: Record<number, number> = {};
    repos.forEach((repo) => {
      const year = new Date(repo.updated_at).getFullYear();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    });
    const mostActiveYear = Object.entries(yearCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || new Date().getFullYear();

    // 6. Create summary
    const estimatedCommits = repos.reduce((sum, r) => sum + Math.max(1, Math.round(r.size / 2)), 0);

    const summary: GitHubStats = {
      total_repos: repos.length,
      total_commits: estimatedCommits,
      lines_added: Math.round(totalLOC * 1.5),
      lines_removed: Math.round(totalLOC * 0.5),
      net_lines_of_code: totalLOC,
      languages_count: Object.keys(languageBytes).length,
      most_active_year: parseInt(mostActiveYear.toString()),
      last_updated: new Date().toISOString(),
    };

    // 7. Cache results
    setCache(summary, languages, topRepos);

    console.log(`✅ Fetched: ${repos.length} repos, ~${totalLOC.toLocaleString()} LOC`);

    return { summary, languages, topRepos };
  } catch (error) {
    console.error("❌ GitHub API Error:", error);

    // 8. Fallback to stale cache
    const stale = getStaleCache();
    if (stale) {
      console.warn("⚠️ Using stale cached data");
      return {
        summary: stale.summary,
        languages: stale.languages,
        topRepos: stale.topRepos,
      };
    }

    throw error;
  }
};

// ============================================
// UTILITY EXPORTS
// ============================================

export const clearGitHubCache = () => {
  localStorage.removeItem(CACHE_KEY);
  console.log("🗑️ Cache cleared");
};

export const forceRefresh = async () => {
  clearGitHubCache();
  return fetchGitHubData();
};
