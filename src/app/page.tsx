"use client";
import React, { useEffect, useState } from "react";
import BlogFetch from "./blog/BlogFetch";
import BlogPreview from "./BlogPreview"; // Make sure the path is correct.
import { useSearchParams } from "next/navigation";

const BlogManager: React.FC = () => {
  const [mobile, setMobile] = useState(false);

  const params = useSearchParams();
  const id = params.get("blog");

  const [selectedBlogId, setSelectedBlogId] = useState(id);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSelectBlogId = (uuid: string) => {
    setSelectedBlogId(uuid);
  };

  return (
    <div className="flex min-h-screen">
      {mobile ? (
        <div>
          <BlogFetch mobile={mobile} id={selectedBlogId} />
          <BlogPreview
            mobile={mobile}
            newlines={4}
            onSelectBlogId={handleSelectBlogId}
          />
        </div>
      ) : (
        <div className="flex">
          <div className="w-[320px] sticky top-0 h-screen overflow-y-auto">
            <BlogPreview
              mobile={mobile}
              newlines={2}
              fontSize="text-lg"
              onSelectBlogId={handleSelectBlogId} // Pass the handler here
            />
          </div>
          <div>
            <BlogFetch mobile={mobile} id={selectedBlogId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
