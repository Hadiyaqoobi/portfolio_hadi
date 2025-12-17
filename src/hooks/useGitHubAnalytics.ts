import { useState, useEffect } from 'react';

interface GitHubSummary {
  total_repos: number;
  total_commits: number;
  lines_added: number;
  lines_removed: number;
  net_lines_of_code: number;
  languages_count: number;
  most_active_year: number;
  last_updated: string;
}

interface Language {
  name: string;
  percentage: number;
  color: string;
}

interface Repository {
  name: string;
  commits: number;
  net_loc: number;
  language: string;
}

export const useGitHubAnalytics = () => {
  const [summary, setSummary] = useState<GitHubSummary | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, langRes, reposRes] = await Promise.all([
          fetch('/data/github/summary.json'),
          fetch('/data/github/languages.json'),
          fetch('/data/github/repos.json')
        ]);

        if (!summaryRes.ok || !langRes.ok || !reposRes.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const summaryData = await summaryRes.json();
        const langData = await langRes.json();
        const reposData = await reposRes.json();

        setSummary(summaryData);
        setLanguages(langData.languages);
        setRepos(reposData.repositories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return { summary, languages, repos, loading, error, formatNumber };
};
