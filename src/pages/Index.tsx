
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { BlogPost } from "@/types/blog";

const Index = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://rubricedge.com/wp-json/wp/v2/posts?_embed");
        const wpPosts = await response.json();

        const posts: BlogPost[] = wpPosts.map((post: any) => ({
          id: post.id.toString(),
          title: post.title.rendered,
          excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ""), // remove HTML tags
          content: post.content.rendered,
          author: post._embedded?.author?.[0]?.name || "Unknown",
          publishedAt: post.date,
          readTime: "3 min read", // Optional: can use ACF or custom logic
          tags: post.tags.map((id: number) => `Tag-${id}`), // Optional: Tag names need another API call
          imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ""
        }));

        setPosts(posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
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
