"use client";

import React, { useEffect, useState } from "react";
import BlogFetch from "./BlogFetch"; // Ensure this is the correct import path
import BlogPreview from "../../page"; // Ensure this is the correct import path

const BlogManager: React.FC = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // adjust the width to your desired breakpoint
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

  return (
    <div className="flex min-h-screen">
      {mobile ? (
        <div>
          <BlogFetch mobile={mobile} />
          <BlogPreview />
        </div>
      ) : (
        <div className="flex">
          <div className="w-[300px] sticky top-0 h-screen">
            <BlogPreview />
          </div>
          <div>
            <BlogFetch mobile={mobile} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
