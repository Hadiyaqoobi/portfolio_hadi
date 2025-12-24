export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [];

// Helper functions
export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);

export const getRecentPosts = (count: number = 5) => 
  [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count);

export const getAllTags = () => {
  const tagSet = new Set<string>();
  blogPosts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
};

export const getPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);

export const getPostsByTag = (tag: string) => blogPosts.filter(post => post.tags.includes(tag));
