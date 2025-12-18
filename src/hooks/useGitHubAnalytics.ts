import { useState, useEffect } from 'react';
import { fetchGitHubData, GitHubStats, LanguageStat, RepoStat, DetectedSkill } from '@/services/githubApi';

// Fallback data in case API fails
const FALLBACK_DATA = {
  summary: {
    total_repos: 35,
    total_commits: 1247,
    lines_added: 185000,
    lines_removed: 61700,
    net_lines_of_code: 123300,
    languages_count: 5,
    most_active_year: 2024,
    last_updated: new Date().toISOString()
  },
  languages: [
    { name: "Python", percentage: 38.2, bytes: 0, color: "#3572A5" },
    { name: "TypeScript", percentage: 22.5, bytes: 0, color: "#2b7489" },
    { name: "JavaScript", percentage: 15.8, bytes: 0, color: "#f1e05a" },
    { name: "Go", percentage: 12.4, bytes: 0, color: "#00ADD8" },
    { name: "Rust", percentage: 11.1, bytes: 0, color: "#dea584" }
  ],
  topRepos: [
    { name: "data-pipeline-automation", commits: 187, language: "Python", stars: 0, url: "#" },
    { name: "portfolio-website", commits: 156, language: "TypeScript", stars: 0, url: "#" },
    { name: "sql-reporting-suite", commits: 134, language: "SQL", stars: 0, url: "#" },
    { name: "bi-dashboard-tools", commits: 98, language: "Python", stars: 0, url: "#" }
  ],
  aiMlSkills: [
    { name: "Pandas", category: "Data Science", color: "#150458", repos: ["data-pipeline"] },
    { name: "Scikit-learn", category: "Machine Learning", color: "#F7931E", repos: ["ml-project"] }
  ],
  devOpsSkills: [
    { name: "Docker", category: "DevOps", color: "#2496ED", repos: ["portfolio"] },
    { name: "PostgreSQL", category: "Database", color: "#4169E1", repos: ["backend-api"] }
  ]
};

export const useGitHubAnalytics = () => {
  const [summary, setSummary] = useState<GitHubStats | null>(null);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [repos, setRepos] = useState<RepoStat[]>([]);
  const [aiMlSkills, setAiMlSkills] = useState<DetectedSkill[]>([]);
  const [devOpsSkills, setDevOpsSkills] = useState<DetectedSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data (service handles caching internally)
        const data = await fetchGitHubData();
        setSummary(data.summary);
        setLanguages(data.languages);
        setRepos(data.topRepos);
        setAiMlSkills(data.aiMlSkills);
        setDevOpsSkills(data.devOpsSkills);
        setIsLive(true);
      } catch (err) {
        console.warn('Using fallback data:', err);
        // Use fallback data if API fails
        setSummary(FALLBACK_DATA.summary);
        setLanguages(FALLBACK_DATA.languages);
        setRepos(FALLBACK_DATA.topRepos);
        setAiMlSkills(FALLBACK_DATA.aiMlSkills);
        setDevOpsSkills(FALLBACK_DATA.devOpsSkills);
        setIsLive(false);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return { summary, languages, repos, aiMlSkills, devOpsSkills, loading, error, formatNumber, isLive };
};
