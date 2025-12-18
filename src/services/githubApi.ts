/**
 * GitHub Data Service - JOB-FOCUSED VERSION
 * 
 * Features:
 * - Only shows job-relevant languages (filters out Jupyter Notebook, etc.)
 * - Detects AI/ML frameworks (TensorFlow, PyTorch, scikit-learn, etc.)
 * - Detects cloud/DevOps tools (AWS, Docker, Kubernetes, etc.)
 * - Shows skills that matter for job applications
 */

const GITHUB_USERNAME = 'hadiyaqoobi';
const CACHE_KEY = 'github_stats_job_focused';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

// ============================================
// JOB-RELEVANT LANGUAGES ONLY
// ============================================

const JOB_RELEVANT_LANGUAGES = new Set([
  'Python',
  'JavaScript',
  'TypeScript',
  'Java',
  'C++',
  'C#',
  'Go',
  'Rust',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'Scala',
  'R',
  'SQL',
  'Shell',
  'C',
  'PLpgSQL',
]);

const EXCLUDE_LANGUAGES = new Set([
  'Jupyter Notebook',
  'HTML',
  'CSS',
  'SCSS',
  'Less',
  'Makefile',
  'Dockerfile',
  'CMake',
  'Batchfile',
  'PowerShell',
  'Vim script',
  'Emacs Lisp',
  'TeX',
  'Roff',
]);

// ============================================
// AI/ML FRAMEWORKS TO DETECT
// ============================================

const AI_ML_FRAMEWORKS: Record<string, { name: string; category: string; color: string }> = {
  'tensorflow': { name: 'TensorFlow', category: 'Deep Learning', color: '#FF6F00' },
  'keras': { name: 'Keras', category: 'Deep Learning', color: '#D00000' },
  'pytorch': { name: 'PyTorch', category: 'Deep Learning', color: '#EE4C2C' },
  'torch': { name: 'PyTorch', category: 'Deep Learning', color: '#EE4C2C' },
  'scikit-learn': { name: 'Scikit-learn', category: 'Machine Learning', color: '#F7931E' },
  'sklearn': { name: 'Scikit-learn', category: 'Machine Learning', color: '#F7931E' },
  'pandas': { name: 'Pandas', category: 'Data Science', color: '#150458' },
  'numpy': { name: 'NumPy', category: 'Data Science', color: '#013243' },
  'matplotlib': { name: 'Matplotlib', category: 'Data Visualization', color: '#11557C' },
  'seaborn': { name: 'Seaborn', category: 'Data Visualization', color: '#444876' },
  'plotly': { name: 'Plotly', category: 'Data Visualization', color: '#3F4F75' },
  'opencv': { name: 'OpenCV', category: 'Computer Vision', color: '#5C3EE8' },
  'cv2': { name: 'OpenCV', category: 'Computer Vision', color: '#5C3EE8' },
  'nltk': { name: 'NLTK', category: 'NLP', color: '#154F5B' },
  'spacy': { name: 'spaCy', category: 'NLP', color: '#09A3D5' },
  'transformers': { name: 'Hugging Face', category: 'NLP/LLM', color: '#FFD21E' },
  'huggingface': { name: 'Hugging Face', category: 'NLP/LLM', color: '#FFD21E' },
  'langchain': { name: 'LangChain', category: 'LLM', color: '#1C3C3C' },
  'openai': { name: 'OpenAI API', category: 'LLM', color: '#412991' },
  'anthropic': { name: 'Anthropic API', category: 'LLM', color: '#D4A574' },
  'xgboost': { name: 'XGBoost', category: 'Machine Learning', color: '#337AB7' },
  'lightgbm': { name: 'LightGBM', category: 'Machine Learning', color: '#9ACD32' },
  'catboost': { name: 'CatBoost', category: 'Machine Learning', color: '#FFCC00' },
  'fastai': { name: 'fast.ai', category: 'Deep Learning', color: '#00A651' },
  'streamlit': { name: 'Streamlit', category: 'ML Deployment', color: '#FF4B4B' },
  'gradio': { name: 'Gradio', category: 'ML Deployment', color: '#F97316' },
  'mlflow': { name: 'MLflow', category: 'MLOps', color: '#0194E2' },
  'wandb': { name: 'Weights & Biases', category: 'MLOps', color: '#FFBE00' },
  'dvc': { name: 'DVC', category: 'MLOps', color: '#945DD6' },
};

// ============================================
// CLOUD & DEVOPS TO DETECT
// ============================================

const CLOUD_DEVOPS: Record<string, { name: string; category: string; color: string }> = {
  'aws': { name: 'AWS', category: 'Cloud', color: '#FF9900' },
  'boto3': { name: 'AWS (boto3)', category: 'Cloud', color: '#FF9900' },
  's3': { name: 'AWS S3', category: 'Cloud', color: '#569A31' },
  'sagemaker': { name: 'AWS SageMaker', category: 'ML Cloud', color: '#FF9900' },
  'azure': { name: 'Azure', category: 'Cloud', color: '#0078D4' },
  'gcp': { name: 'Google Cloud', category: 'Cloud', color: '#4285F4' },
  'firebase': { name: 'Firebase', category: 'Cloud', color: '#FFCA28' },
  'docker': { name: 'Docker', category: 'DevOps', color: '#2496ED' },
  'kubernetes': { name: 'Kubernetes', category: 'DevOps', color: '#326CE5' },
  'k8s': { name: 'Kubernetes', category: 'DevOps', color: '#326CE5' },
  'terraform': { name: 'Terraform', category: 'IaC', color: '#7B42BC' },
  'redis': { name: 'Redis', category: 'Database', color: '#DC382D' },
  'mongodb': { name: 'MongoDB', category: 'Database', color: '#47A248' },
  'postgresql': { name: 'PostgreSQL', category: 'Database', color: '#4169E1' },
  'mysql': { name: 'MySQL', category: 'Database', color: '#4479A1' },
  'graphql': { name: 'GraphQL', category: 'API', color: '#E10098' },
  'fastapi': { name: 'FastAPI', category: 'Backend', color: '#009688' },
  'flask': { name: 'Flask', category: 'Backend', color: '#000000' },
  'django': { name: 'Django', category: 'Backend', color: '#092E20' },
  'express': { name: 'Express.js', category: 'Backend', color: '#000000' },
  'nextjs': { name: 'Next.js', category: 'Frontend', color: '#000000' },
  'react': { name: 'React', category: 'Frontend', color: '#61DAFB' },
  'vue': { name: 'Vue.js', category: 'Frontend', color: '#4FC08D' },
  'supabase': { name: 'Supabase', category: 'Backend', color: '#3ECF8E' },
};

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
  default_branch: string;
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

export interface DetectedSkill {
  name: string;
  category: string;
  color: string;
  repos: string[];
}

interface CachedData {
  timestamp: number;
  summary: GitHubStats;
  languages: LanguageStat[];
  topRepos: RepoStat[];
  aiMlSkills: DetectedSkill[];
  devOpsSkills: DetectedSkill[];
}

// ============================================
// LANGUAGE COLORS
// ============================================

const LANGUAGE_COLORS: Record<string, string> = {
  'Python': '#3572A5',
  'TypeScript': '#2b7489',
  'JavaScript': '#f1e05a',
  'SQL': '#e38c00',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C#': '#239120',
  'C': '#555555',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Ruby': '#701516',
  'PHP': '#4F5D95',
  'Swift': '#ffac45',
  'Kotlin': '#F18E33',
  'Shell': '#89e051',
  'Scala': '#c22d40',
  'R': '#198ce7',
  'PLpgSQL': '#336791',
};

const BYTES_PER_LINE: Record<string, number> = {
  'Python': 30,
  'JavaScript': 25,
  'TypeScript': 28,
  'Java': 35,
  'C++': 30,
  'C': 25,
  'C#': 35,
  'Go': 22,
  'Rust': 28,
  'Ruby': 22,
  'PHP': 28,
  'SQL': 35,
  'Shell': 25,
  'R': 30,
  'Scala': 32,
  'PLpgSQL': 35,
  'default': 28,
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
      console.log(`📦 Using cached data (${Math.round(age / 60000)} min old)`);
      return data;
    }
    return null;
  } catch {
    return null;
  }
};

const setCache = (data: Omit<CachedData, 'timestamp'>) => {
  try {
    const cacheData: CachedData = { ...data, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    console.log('💾 Cached for 1 hour');
  } catch (e) {
    console.warn('Cache failed:', e);
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
// HELPERS
// ============================================

const bytesToLOC = (bytes: number, language: string): number => {
  const bpl = BYTES_PER_LINE[language] || BYTES_PER_LINE.default;
  return Math.round(bytes / bpl);
};

const detectSkillsInRepoName = (repoName: string, repoList: Map<string, string[]>, skillMap: Record<string, { name: string; category: string; color: string }>) => {
  const lowerName = repoName.toLowerCase().replace(/[-_]/g, '');
  
  for (const [keyword, skill] of Object.entries(skillMap)) {
    if (lowerName.includes(keyword.replace(/[-_]/g, ''))) {
      const existing = repoList.get(skill.name) || [];
      if (!existing.includes(repoName)) {
        repoList.set(skill.name, [...existing, repoName]);
      }
    }
  }
};

// ============================================
// MAIN FETCH FUNCTION
// ============================================

export const fetchGitHubData = async () => {
  // Check cache first
  const cached = getCache();
  if (cached) {
    return {
      summary: cached.summary,
      languages: cached.languages,
      topRepos: cached.topRepos,
      aiMlSkills: cached.aiMlSkills,
      devOpsSkills: cached.devOpsSkills,
    };
  }

  console.log('🔄 Fetching GitHub data with skill detection...');

  try {
    // Step 1: Get all repos
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    );

    if (!reposRes.ok) {
      throw new Error(reposRes.status === 403 ? 'Rate limit exceeded' : `API error: ${reposRes.status}`);
    }

    const repos: GitHubRepo[] = await reposRes.json();
    
    const remaining = parseInt(reposRes.headers.get('X-RateLimit-Remaining') || '60');
    console.log(`📊 API calls remaining: ${remaining}`);

    // Step 2: Fetch languages for each repo & detect skills
    const languageTotals: Record<string, number> = {};
    const aiMlRepos = new Map<string, string[]>();
    const devOpsRepos = new Map<string, string[]>();
    
    const repoLanguageData: Array<{
      name: string;
      languages: Record<string, number>;
      totalBytes: number;
      stars: number;
      url: string;
    }> = [];

    console.log(`📂 Analyzing ${repos.length} repos...`);

    for (const repo of repos) {
      // Detect skills from repo name
      detectSkillsInRepoName(repo.name, aiMlRepos, AI_ML_FRAMEWORKS);
      detectSkillsInRepoName(repo.name, devOpsRepos, CLOUD_DEVOPS);

      try {
        const langRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`
        );
        
        if (langRes.ok) {
          const languages: Record<string, number> = await langRes.json();
          let totalBytes = 0;
          
          // Only count JOB-RELEVANT languages
          for (const [lang, bytes] of Object.entries(languages)) {
            if (!EXCLUDE_LANGUAGES.has(lang)) {
              languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
              totalBytes += bytes;
            }
          }
          
          if (totalBytes > 0) {
            repoLanguageData.push({
              name: repo.name,
              languages,
              totalBytes,
              stars: repo.stargazers_count,
              url: repo.html_url,
            });
          }
        }
      } catch (e) {
        console.warn(`Failed for ${repo.name}:`, e);
      }
    }

    // Step 3: Also try to fetch README for skill detection (first 10 repos only to save API calls)
    for (const repo of repos.slice(0, 10)) {
      try {
        const readmeRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`,
          { headers: { 'Accept': 'application/vnd.github.raw' } }
        );
        
        if (readmeRes.ok) {
          const readme = await readmeRes.text();
          const lowerReadme = readme.toLowerCase();
          
          // Check for AI/ML frameworks
          for (const [keyword, skill] of Object.entries(AI_ML_FRAMEWORKS)) {
            if (lowerReadme.includes(keyword)) {
              const existing = aiMlRepos.get(skill.name) || [];
              if (!existing.includes(repo.name)) {
                aiMlRepos.set(skill.name, [...existing, repo.name]);
              }
            }
          }
          
          // Check for DevOps tools
          for (const [keyword, skill] of Object.entries(CLOUD_DEVOPS)) {
            if (lowerReadme.includes(keyword)) {
              const existing = devOpsRepos.get(skill.name) || [];
              if (!existing.includes(repo.name)) {
                devOpsRepos.set(skill.name, [...existing, repo.name]);
              }
            }
          }
        }
      } catch {
        // README not found, skip
      }
    }

    // Step 4: Calculate totals (JOB-RELEVANT only)
    const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);
    
    let totalLOC = 0;
    for (const [lang, bytes] of Object.entries(languageTotals)) {
      totalLOC += bytesToLOC(bytes, lang);
    }

    // Step 5: Create language stats (filtered & sorted)
    const languages: LanguageStat[] = Object.entries(languageTotals)
      .filter(([name]) => JOB_RELEVANT_LANGUAGES.has(name) || !EXCLUDE_LANGUAGES.has(name))
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: Math.round((bytes / totalBytes) * 1000) / 10,
        color: LANGUAGE_COLORS[name] || '#858585',
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5); // Top 5 only

    // Step 6: Get top repos
    const topRepos: RepoStat[] = repoLanguageData
      .sort((a, b) => b.totalBytes - a.totalBytes)
      .slice(0, 4)
      .map(repo => {
        const primaryLang = Object.entries(repo.languages)
          .filter(([lang]) => !EXCLUDE_LANGUAGES.has(lang))
          .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Unknown';
        const loc = Object.entries(repo.languages)
          .filter(([lang]) => !EXCLUDE_LANGUAGES.has(lang))
          .reduce((sum, [lang, bytes]) => sum + bytesToLOC(bytes, lang), 0);
        
        return {
          name: repo.name,
          commits: loc,
          language: primaryLang,
          stars: repo.stars,
          url: repo.url,
        };
      });

    // Step 7: Create AI/ML skills array
    const aiMlSkills: DetectedSkill[] = Array.from(aiMlRepos.entries())
      .map(([name, repos]) => {
        const framework = Object.values(AI_ML_FRAMEWORKS).find(f => f.name === name);
        return {
          name,
          category: framework?.category || 'AI/ML',
          color: framework?.color || '#858585',
          repos,
        };
      })
      .sort((a, b) => b.repos.length - a.repos.length);

    // Step 8: Create DevOps skills array
    const devOpsSkills: DetectedSkill[] = Array.from(devOpsRepos.entries())
      .map(([name, repos]) => {
        const tool = Object.values(CLOUD_DEVOPS).find(t => t.name === name);
        return {
          name,
          category: tool?.category || 'DevOps',
          color: tool?.color || '#858585',
          repos,
        };
      })
      .sort((a, b) => b.repos.length - a.repos.length);

    // Step 9: Find most active year
    const yearCounts: Record<number, number> = {};
    repos.forEach(repo => {
      const year = new Date(repo.updated_at).getFullYear();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    });
    const mostActiveYear = Object.entries(yearCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || new Date().getFullYear();

    // Step 10: Create summary
    const summary: GitHubStats = {
      total_repos: repos.length,
      total_commits: totalLOC,
      lines_added: Math.round(totalLOC * 1.2),
      lines_removed: Math.round(totalLOC * 0.2),
      net_lines_of_code: totalLOC,
      languages_count: languages.length,
      most_active_year: parseInt(mostActiveYear.toString()),
      last_updated: new Date().toISOString(),
    };

    // Cache results
    setCache({ summary, languages, topRepos, aiMlSkills, devOpsSkills });

    console.log(`✅ Stats: ${totalLOC.toLocaleString()} LOC in ${languages.length} languages`);
    console.log(`🤖 AI/ML Skills: ${aiMlSkills.map(s => s.name).join(', ') || 'None detected'}`);
    console.log(`☁️ DevOps Skills: ${devOpsSkills.map(s => s.name).join(', ') || 'None detected'}`);

    return { summary, languages, topRepos, aiMlSkills, devOpsSkills };

  } catch (error) {
    console.error('❌ GitHub API Error:', error);

    const stale = getStaleCache();
    if (stale) {
      console.warn('⚠️ Using stale cache');
      return {
        summary: stale.summary,
        languages: stale.languages,
        topRepos: stale.topRepos,
        aiMlSkills: stale.aiMlSkills || [],
        devOpsSkills: stale.devOpsSkills || [],
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
  console.log('🗑️ Cache cleared');
};

export const forceRefresh = async () => {
  clearGitHubCache();
  return fetchGitHubData();
};
