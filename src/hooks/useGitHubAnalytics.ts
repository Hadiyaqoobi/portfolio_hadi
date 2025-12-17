import { useState, useEffect } from 'react';
import { fetchGitHubData, GitHubStats, LanguageStat, RepoStat } from '@/services/githubApi';

const CACHE_KEY = 'github_analytics_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// Fallback data in case API fails
const FALLBACK_DATA = {
  summary: {
    total_repos: 35,
    total_commits: 1247,
    lines_added: 185000,
    lines_removed: 61700,
    net_lines_of_code: 123300,
    languages_count: 14,
    most_active_year: 2024,
    last_updated: new Date().toISOString()
  },
  languages: [
    { name: "Python", percentage: 38.2, bytes: 0, color: "#3572A5" },
    { name: "TypeScript", percentage: 22.5, bytes: 0, color: "#2b7489" },
    { name: "SQL", percentage: 15.8, bytes: 0, color: "#e38c00" },
    { name: "JavaScript", percentage: 12.4, bytes: 0, color: "#f1e05a" },
    { name: "HTML/CSS", percentage: 11.1, bytes: 0, color: "#e34c26" }
  ],
  topRepos: [
    { name: "data-pipeline-automation", commits: 187, language: "Python", stars: 0, url: "#" },
    { name: "portfolio-website", commits: 156, language: "TypeScript", stars: 0, url: "#" },
    { name: "sql-reporting-suite", commits: 134, language: "SQL", stars: 0, url: "#" },
    { name: "bi-dashboard-tools", commits: 98, language: "Python", stars: 0, url: "#" }
  ]
};

interface CachedData {
  data: {
    summary: GitHubStats;
    languages: LanguageStat[];
    topRepos: RepoStat[];
  };
  timestamp: number;
}

export const useGitHubAnalytics = () => {
  const [summary, setSummary] = useState<GitHubStats | null>(null);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [repos, setRepos] = useState<RepoStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp }: CachedData = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setSummary(data.summary);
            setLanguages(data.languages);
            setRepos(data.topRepos);
            setIsLive(true);
            setLoading(false);
            return;
          }
        }

        // Fetch fresh data
        const data = await fetchGitHubData();
        setSummary(data.summary);
        setLanguages(data.languages);
        setRepos(data.topRepos);
        setIsLive(true);

        // Save to cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: { summary: data.summary, languages: data.languages, topRepos: data.topRepos },
          timestamp: Date.now()
        }));

      } catch (err) {
        console.warn('Using fallback data:', err);
        // Use fallback data if API fails
        setSummary(FALLBACK_DATA.summary);
        setLanguages(FALLBACK_DATA.languages);
        setRepos(FALLBACK_DATA.topRepos);
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

  return { summary, languages, repos, loading, error, formatNumber, isLive };
};
