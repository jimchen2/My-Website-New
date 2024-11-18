"use client";
import React, { useEffect, useState, Suspense } from "react";
import BlogFetch from "../blog/BlogFetch";
import BlogPreview from "../blog/BlogPreview";
import { useSearchParams, useRouter } from "next/navigation";

// Create a separate component for the search params logic
const BlogContent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const urlTitle = params.get("title");
  const [selectedBlogTitle, setSelectedBlogTitle] = useState(urlTitle || "My New Website");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (urlTitle && urlTitle !== selectedBlogTitle) {
      setSelectedBlogTitle(urlTitle);
    }
  }, [urlTitle]);

  const handleSelectBlogId = (title: string) => {
    setSelectedBlogTitle(title);
    router.push(`/?title=${encodeURIComponent(title)}`, undefined, { shallow: true });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isMobile ? (
        <div className="w-full">
          <BlogFetch mobile={isMobile} title={selectedBlogTitle} />
          <BlogPreview
            mobile={isMobile}
            newlines={4}
            onSelectBlogId={handleSelectBlogId}
          />
        </div>
      ) : (
        <div className="flex w-full">
          <div className="w-80 fixed left-0 top-0 h-screen overflow-y-auto bg-white shadow-md">
            <BlogPreview
              mobile={isMobile}
              newlines={2}
              fontSize="text-lg"
              onSelectBlogId={handleSelectBlogId}
            />
          </div>
          <div className="ml-80 flex-grow p-6">
            <BlogFetch mobile={isMobile} title={selectedBlogTitle} />
          </div>
        </div>
      )}
    </div>
  );
};

// Create a fallback component
const BlogContentFallback = () => {
  return <div>Loading...</div>;
};

// Main BlogManager component with Suspense
const BlogManager: React.FC = () => {
  return (
    <Suspense fallback={<BlogContentFallback />}>
      <BlogContent />
    </Suspense>
  );
};

export default BlogManager;
