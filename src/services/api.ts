
import { BlogPost } from "@/types/blog";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const blogApi = {
  // Get all blog posts
  async getPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Get a single blog post by ID
  async getPost(id: string): Promise<BlogPost> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  // Search posts by query
  async searchPosts(query: string): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search posts');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error;
    }
  },

  // Get posts by tag
  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/tag/${encodeURIComponent(tag)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts by tag');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
      throw error;
    }
  }
};
