
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { BlogPost } from "@/types/blog";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://rubricedge.com/wp-json/wp/v2/posts/${id}?_embed`);
        const wpPost = await response.json();

        const post: BlogPost = {
          id: wpPost.id.toString(),
          title: wpPost.title.rendered,
          excerpt: wpPost.excerpt.rendered.replace(/<[^>]+>/g, ""), // remove HTML tags
          content: wpPost.content.rendered,
          author: wpPost._embedded?.author?.[0]?.name || "Unknown",
          publishedAt: wpPost.date,
          readTime: "3 min read", // Optional: can use ACF or custom logic
          tags: wpPost.tags.map((id: number) => `Tag-${id}`), // Optional: Tag names need another API call
          imageUrl: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || ""
        };

        setPost(post);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
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
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default Post;
