import { motion } from "framer-motion";
import { 
  Code2, 
  GitCommit, 
  FolderGit2, 
  TrendingUp, 
  Activity, 
  Calendar,
  ExternalLink,
  Brain,
  Cloud
} from "lucide-react";
import { useGitHubAnalytics } from "@/hooks/useGitHubAnalytics";

const LoadingSkeleton = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <div className="h-12 w-80 bg-card/50 rounded-lg mx-auto mb-4 animate-pulse" />
        <div className="h-6 w-64 bg-card/30 rounded mx-auto animate-pulse" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-28 bg-card/30 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  </section>
);

export const EngineeringFootprint = () => {
  const { summary, languages, repos, aiMlSkills, devOpsSkills, loading, formatNumber, isLive } = useGitHubAnalytics();

  if (loading) return <LoadingSkeleton />;
  if (!summary) return null;

  const stats = [
    { icon: Code2, value: formatNumber(summary.net_lines_of_code), label: "Net LOC", color: "text-primary" },
    { icon: GitCommit, value: formatNumber(summary.total_commits), label: "Commits", color: "text-accent" },
    { icon: FolderGit2, value: summary.total_repos.toString(), label: "Repos", color: "text-neon-green" },
    { icon: TrendingUp, value: "+" + formatNumber(summary.lines_added), label: "Lines Added", color: "text-neon-green" },
    { icon: Activity, value: summary.most_active_year.toString(), label: "Most Active", color: "text-neon-magenta" },
    { icon: Calendar, value: summary.languages_count.toString(), label: "Languages", color: "text-neon-yellow" },
  ];

  const lastUpdated = new Date(summary.last_updated).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Engineering Footprint</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Live metrics from my GitHub contributions
          </p>
        </motion.div>

        {/* Stats Grid - 6 cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-lg p-4 text-center group hover:border-primary/50 transition-colors"
              >
                <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <div className={`terminal-font text-xl md:text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Detected Skills Section */}
        {(aiMlSkills.length > 0 || devOpsSkills.length > 0) && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* AI/ML Skills */}
            {aiMlSkills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border border-neon-magenta/30 bg-card/50 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-neon-magenta" />
                  <h3 className="font-bold text-lg text-foreground">AI & Machine Learning</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aiMlSkills.map((skill, index) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="px-3 py-1.5 rounded-full text-sm font-medium border"
                      style={{ 
                        backgroundColor: `${skill.color}20`,
                        borderColor: `${skill.color}50`,
                        color: skill.color
                      }}
                      title={`Found in: ${skill.repos.join(', ')}`}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Detected from {aiMlSkills.reduce((acc, s) => acc + s.repos.length, 0)} repositories
                </p>
              </motion.div>
            )}

            {/* DevOps & Cloud Skills */}
            {devOpsSkills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border border-accent/30 bg-card/50 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Cloud className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-lg text-foreground">DevOps & Cloud</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {devOpsSkills.map((skill, index) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="px-3 py-1.5 rounded-full text-sm font-medium border"
                      style={{ 
                        backgroundColor: `${skill.color}20`,
                        borderColor: `${skill.color}50`,
                        color: skill.color
                      }}
                      title={`Found in: ${skill.repos.join(', ')}`}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Detected from {devOpsSkills.reduce((acc, s) => acc + s.repos.length, 0)} repositories
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Language Distribution Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-foreground">Language Distribution</h3>
            </div>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{lang.name}</span>
                    <span className="text-muted-foreground">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-primary/20">
              <span className="text-sm text-muted-foreground">Showing top {languages.length} languages</span>
              <span className="text-sm font-bold text-primary">Job-relevant only</span>
            </div>
          </motion.div>

          {/* Top Repositories Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-primary/30 bg-card/50 backdrop-blur-sm rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <FolderGit2 className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-lg text-foreground">Top Repositories</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 text-xs text-muted-foreground pb-2 border-b border-primary/10">
                <span>Repository</span>
                <span className="text-center">LOC</span>
                <span className="text-right">Stars</span>
              </div>
              {repos.map((repo, index) => (
                <a 
                  key={index} 
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-3 items-center text-sm py-2 hover:bg-primary/5 rounded px-1 transition-colors"
                >
                  <span className="text-foreground truncate">{repo.name}</span>
                  <span className="text-center text-muted-foreground">{formatNumber(repo.commits)}</span>
                  <span className="text-right text-neon-yellow">★ {repo.stars}</span>
                </a>
              ))}
            </div>
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-primary/20">
              <span className="text-xs text-muted-foreground">Showing top {repos.length} of {summary.total_repos}</span>
              <a 
                href="https://github.com/hadiyaqoobi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
              >
                View all <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Sync Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-4 bg-card/30 border border-primary/20 rounded-full px-6 py-2 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isLive ? 'bg-neon-green' : 'bg-neon-yellow'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-neon-green' : 'bg-neon-yellow'}`}></span>
              </span>
              <span className={`text-xs terminal-font ${isLive ? 'text-neon-green' : 'text-neon-yellow'}`}>
                {isLive ? 'LIVE DATA' : 'CACHED DATA'}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{lastUpdated}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
