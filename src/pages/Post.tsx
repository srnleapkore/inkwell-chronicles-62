
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { BlogPost } from "@/types/blog";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";

// This would normally come from your API
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    excerpt: "Learn how to set up a modern React application with TypeScript, covering best practices and essential configurations.",
    content: `# Getting Started with React and TypeScript

React and TypeScript make a powerful combination for building robust web applications. In this post, we'll explore how to set up a modern React application with TypeScript.

## Why TypeScript?

TypeScript provides static type checking, which helps catch errors early in development and improves code maintainability. Here are some key benefits:

- **Type Safety**: Catch errors at compile time rather than runtime
- **Better IDE Support**: Enhanced autocomplete and refactoring tools
- **Improved Documentation**: Types serve as documentation for your code
- **Easier Refactoring**: Confident code changes with type checking

## Setting Up Your Project

First, create a new React project with TypeScript support:

\`\`\`bash
npx create-react-app my-app --template typescript
cd my-app
npm start
\`\`\`

This creates a new project with all the necessary TypeScript configurations.

## Key TypeScript Concepts for React

### Component Props

Always define interfaces for your component props:

\`\`\`typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

### State with TypeScript

Use generic types with useState for complex state:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);
\`\`\`

## Best Practices

1. **Use interfaces over types** for object shapes
2. **Enable strict mode** in tsconfig.json
3. **Use generic types** for reusable components
4. **Leverage utility types** like Partial, Pick, and Omit

## Conclusion

TypeScript with React provides a robust foundation for building maintainable applications. Start with basic typing and gradually adopt more advanced patterns as you become comfortable with the language.`,
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

A well-organized project structure is the foundation of any scalable application.

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

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch(`/api/posts/${id}`);
        // const data = await response.json();
        // setPost(data);
        
        // For now, using mock data
        await new Promise(resolve => setTimeout(resolve, 300));
        const foundPost = mockPosts.find(p => p.id === id);
        setPost(foundPost || null);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="bg-gray-300 h-8 rounded mb-4"></div>
            <div className="bg-gray-300 h-64 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-4 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The post you're looking for doesn't exist.</p>
          <a 
            href="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <a 
            href="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </a>

          {/* Post Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between text-gray-600 mb-8">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <User size={18} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={18} />
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={18} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="mb-8">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default Post;
