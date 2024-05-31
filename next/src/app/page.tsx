"use client";

import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/navigation";

interface BlogPreview {
  _id: string;
  title: string;
  date: string;
  uuid: string;
  body: string;
  type: string;
}

interface BlogType {
  type: string;
  blogs: BlogPreview[];
}
// Improved type definition for props (no need to export this interface)
interface BlogPreviewProps {
  newlines?: number; // Made optional with default value
  fontSize?: string; // Made optional with default value
}

const BlogPreview: React.FC<BlogPreviewProps> = ({
  newlines = 4,
  fontSize = "text-2xl",
}) => {
  const [blogPreviews, setBlogPreviews] = useState<BlogType[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogPreviews = async () => {
      const res = await fetch("/api/previewBlog");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data: BlogType[] = await res.json();
      setBlogPreviews(data);
    };

    fetchBlogPreviews();
  }, []);

  const toggleDropdown = (type: string) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const renderNewlines = () => {
    return Array.from({ length: newlines }).map((_, idx) => <br key={idx} />);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full sticky top-0">
        {renderNewlines()}
        <header className={`${fontSize} font-bold p-4 text-center`}>
          My Blogs
        </header>

        <ul className="space-y-4 overflow-x-hidden">
          {blogPreviews.map((blogType) => (
            <li key={blogType.type}>
              <div className="rounded-lg shadow-lg p-4 transition duration-300 ease-in-out transform hover:scale-105">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDropdown(blogType.type)}
                >
                  <h4 className="ml-[5%] font-medium text-gray-900">
                    {blogType.type} ({blogType.blogs.length})
                  </h4>
                  <ChevronDownIcon
                    className={`h-5 w-5 transform transition-transform duration-300 ${
                      openDropdown === blogType.type ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                {openDropdown === blogType.type && (
                  <ul className="mt-2 space-y-2">
                    {blogType.blogs.map((blog) => (
                      <li
                        key={blog._id}
                        className="p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        <div className="flex justify-center">
                          <h6 className="font-semibold text-gray-600">
                            <button
                              className="underline underline-offset-2 hover:no-underline"
                              onClick={() => router.push(`/blog/${blog.uuid}`)}
                            >
                              {blog.title}
                            </button>
                          </h6>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
          {renderNewlines()}
        </ul>
      </div>
    </div>
  );
};

export default BlogPreview;
