import { useState, useEffect } from 'react';
import { fetchGitHubData, GitHubStats, LanguageStat, RepoStat, DetectedSkill } from '@/services/githubApi';

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
        // No fabricated fallback. If the GitHub API is unavailable we show
        // nothing but a plain "View GitHub Profile" link, never invented stats.
        console.warn('GitHub API unavailable, hiding live stats:', err);
        setSummary(null);
        setLanguages([]);
        setRepos([]);
        setAiMlSkills([]);
        setDevOpsSkills([]);
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
