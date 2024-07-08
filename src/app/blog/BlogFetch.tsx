"use client";

import { useEffect, useState } from "react";
import BlogContent from "./BlogContent";
import MobileBlogContent from "./MobileBlogContent";

interface Post {
  _id: string;
  title: string;
  date: string;
  type: string;
  access: 1 | 2 | 3;
  body: string;
}

interface BlogPostProps {
  mobile: boolean;
  title: string;
  type?: string;
}

const BlogFetch: React.FC<BlogPostProps> = ({ mobile, title, type }) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (title) {
      let url = `/api/getBlog?title=${encodeURIComponent(title)}`;
      if (type) {
        url += `&type=${encodeURIComponent(type)}`;
      }

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setPosts(Array.isArray(data) ? data : [data]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch posts:", error);
          setLoading(false);
        });
    }
  }, [title, type]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-center text-gray-500">No posts found</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          {mobile ? (
            <MobileBlogContent
              title={post.title}
              type={post.type}
              date={post.date}
              body={post.body}
            />
          ) : (
            <BlogContent
              title={post.title}
              type={post.type}
              date={post.date}
              body={post.body}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogFetch;