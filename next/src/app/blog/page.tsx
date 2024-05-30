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

const BlogPreview: React.FC = () => {
  const [blogPreviews, setBlogPreviews] = useState<BlogType[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogPreviews = async () => {
      const res = await fetch("/api/previewBlog");
      const data: BlogType[] = await res.json();
      setBlogPreviews(data);
    };

    fetchBlogPreviews();
  }, []);

  const toggleDropdown = (type: string) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 grayscale">
      <div className="w-full h-screen overflow-y-auto sticky top-0">
        <br />
        <br />
        <br />

        <ul className="space-y-4">
          {blogPreviews.map((blogType) => (
            <li key={blogType.type}>
              <div className="bg-white rounded shadow p-2">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDropdown(blogType.type)}
                >
                  <h4 className="font-medium text-gray-900">
                    {blogType.type} ({blogType.blogs.length})
                  </h4>
                  <ChevronDownIcon
                    className={`h-5 w-5 transform ${openDropdown === blogType.type ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </div>
                {openDropdown === blogType.type && (
                  <ul className="mt-2 space-y-2">
                    {blogType.blogs.map((blog) => (
                      <li key={blog._id} className="bg-gray-100 p-2 rounded">
                        <h6 className="font-semibold text-blue-600">
                          <button
                            className="underline underline-offset-2 hover:no-underline"
                            onClick={() => router.push(`/blog/${blog.uuid}`)}
                          >
                            {blog.title}
                          </button>
                        </h6>
                        <p className="text-gray-700">{blog.body}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogPreview;
