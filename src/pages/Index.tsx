
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { BlogPost } from "@/types/blog";

// Mock data - replace this with your API call later
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    excerpt: "Learn how to set up a modern React application with TypeScript, covering best practices and essential configurations.",
    content: `# Getting Started with React and TypeScript

React and TypeScript make a powerful combination for building robust web applications. In this post, we'll explore how to set up a modern React application with TypeScript.

## Why TypeScript?

TypeScript provides static type checking, which helps catch errors early in development and improves code maintainability.

## Setting Up Your Project

First, create a new React project with TypeScript support:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

This creates a new project with all the necessary TypeScript configurations.`,
    author: "John Doe",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    tags: ["React", "TypeScript", "Web Development"],
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
  },
  {
    id: "2",
    title: "Modern CSS Techniques for Better Layouts",
    excerpt: "Discover the latest CSS features and techniques that will revolutionize how you approach web layouts and design.",
    content: `# Modern CSS Techniques for Better Layouts

CSS has evolved tremendously in recent years. Let's explore some modern techniques that will improve your layouts.

## CSS Grid vs Flexbox

Understanding when to use CSS Grid versus Flexbox is crucial for modern web development.

### CSS Grid
- Best for two-dimensional layouts
- Great for complex page layouts
- Provides precise control over rows and columns

### Flexbox
- Best for one-dimensional layouts
- Perfect for component-level layouts
- Excellent for alignment and distribution`,
    author: "Jane Smith",
    publishedAt: "2024-01-10",
    readTime: "8 min read",
    tags: ["CSS", "Web Design", "Frontend"],
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
  },
  {
    id: "3",
    title: "Building Scalable Node.js Applications",
    excerpt: "Best practices for building maintainable and scalable backend applications with Node.js and Express.",
    content: `# Building Scalable Node.js Applications

Creating scalable Node.js applications requires careful planning and adherence to best practices.

## Project Structure

A well-organized project structure is the foundation of any scalable application:

\`\`\`
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
└── config/
\`\`\`

## Key Principles

1. **Separation of Concerns**: Keep your business logic separate from your route handlers
2. **Error Handling**: Implement comprehensive error handling
3. **Environment Configuration**: Use environment variables for configuration`,
    author: "Mike Johnson",
    publishedAt: "2024-01-05",
    readTime: "12 min read",
    tags: ["Node.js", "Backend", "JavaScript"],
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop"
  }
];

const Index = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // This is where you'll integrate your API later
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch('/api/posts');
        // const data = await response.json();
        // setPosts(data);
        
        // For now, using mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        setPosts(mockPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Thoughts, stories, and ideas on web development, technology, and life
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {posts[0] && (
        <section className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={posts[0].imageUrl} 
                  alt={posts[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <span className="text-blue-600 text-sm font-semibold uppercase tracking-wide">
                  Featured Post
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4">
                  <a href={`/post/${posts[0].id}`} className="hover:text-blue-600 transition-colors">
                    {posts[0].title}
                  </a>
                </h2>
                <p className="text-gray-600 mb-6">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{posts[0].author}</span>
                  <span>{posts[0].readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Posts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
