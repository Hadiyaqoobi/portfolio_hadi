const GITHUB_USERNAME = 'hadiyaqoobi';

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

// Language colors mapping
const LANGUAGE_COLORS: Record<string, string> = {
  'Python': '#3572A5',
  'TypeScript': '#2b7489',
  'JavaScript': '#f1e05a',
  'SQL': '#e38c00',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C#': '#239120',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Ruby': '#701516',
  'PHP': '#4F5D95',
  'Swift': '#ffac45',
  'Kotlin': '#F18E33',
  'Shell': '#89e051',
  'PowerShell': '#012456',
  'Jupyter Notebook': '#DA5B0B',
};

export const fetchGitHubData = async () => {
  try {
    // Fetch all public repos
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    );
    
    if (!reposResponse.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }
    
    const repos: GitHubRepo[] = await reposResponse.json();
    
    // Calculate language distribution
    const languageBytes: Record<string, number> = {};
    let totalBytes = 0;
    
    for (const repo of repos) {
      if (repo.language) {
        languageBytes[repo.language] = (languageBytes[repo.language] || 0) + repo.size;
        totalBytes += repo.size;
      }
    }
    
    // Convert to percentages and sort
    const languages: LanguageStat[] = Object.entries(languageBytes)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: Math.round((bytes / totalBytes) * 1000) / 10,
        color: LANGUAGE_COLORS[name] || '#858585'
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5); // Top 5 languages
    
    // Get top repos by size (as proxy for LOC)
    const topRepos: RepoStat[] = repos
      .filter(r => r.language)
      .sort((a, b) => b.size - a.size)
      .slice(0, 4)
      .map(repo => ({
        name: repo.name,
        commits: Math.round(repo.size / 50), // Estimate commits from size
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count,
        url: repo.html_url
      }));
    
    // Calculate summary stats
    const totalSize = repos.reduce((sum, r) => sum + r.size, 0);
    const estimatedLOC = Math.round(totalSize * 0.8); // Rough KB to LOC estimate
    
    // Find most active year
    const yearCounts: Record<number, number> = {};
    repos.forEach(repo => {
      const year = new Date(repo.updated_at).getFullYear();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    });
    const mostActiveYear = Object.entries(yearCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || new Date().getFullYear();
    
    const summary: GitHubStats = {
      total_repos: repos.length,
      total_commits: repos.reduce((sum, r) => sum + Math.round(r.size / 50), 0),
      lines_added: Math.round(estimatedLOC * 1.5),
      lines_removed: Math.round(estimatedLOC * 0.5),
      net_lines_of_code: estimatedLOC,
      languages_count: Object.keys(languageBytes).length,
      most_active_year: parseInt(mostActiveYear.toString()),
      last_updated: new Date().toISOString()
    };
    
    return { summary, languages, topRepos };
    
  } catch (error) {
    console.error('GitHub API Error:', error);
    throw error;
  }
};
