
import { BlogPost } from "@/types/blog";
import { Calendar, Clock, User } from "lucide-react";

interface PostCardProps {
  post: BlogPost;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {post.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <a 
            href={`/post/${post.id}`} 
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </a>
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
