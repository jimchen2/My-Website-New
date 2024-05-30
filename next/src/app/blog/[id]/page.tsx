import React from "react";
import BlogPost from "./BlogFetch"; // Ensure this is the correct import path
import BlogPreview from "../page"; // Ensure this is the correct import path

const BlogManager: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-[300px] sticky top-0 h-screen">
        <BlogPreview />
      </div>
      <div >
        <BlogPost />
      </div>
    </div>
  );
};

export default BlogManager;
