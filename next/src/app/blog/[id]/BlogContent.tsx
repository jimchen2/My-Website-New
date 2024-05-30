import React, { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import TableOfContents from "./TableOfContents";
import "./blog.css";

interface BlogContentProps {
  title: string;
  type: string;
  date: string;
  body: string;
}

function extractHeadings(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const headings = Array.from(tmp.querySelectorAll("h2")).map((heading) => ({
    id: heading.id,
    text: heading.textContent,
    tagName: heading.tagName,
  }));
  console.log(headings);
  return headings;
}

const BlogContent: React.FC<BlogContentProps> = ({
  title,
  type,
  date,
  body,
}) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Scroll to the hash if present
    if (window.location.hash) {
      const elementId = window.location.hash.substring(1).toLowerCase();
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView();
        setTimeout(() => {
          window.scrollBy(0, -30);
        }, 100); // Adjust the delay as needed
      }
    }

    // Extract headings
    setHeadings(extractHeadings(body));
  }, [body]);

  return (
    <MathJaxContext>
      <br />
      <br />
      <br />

      <div className="flex flex-col lg:flex-row">
        <div className="max-w-3xl mx-auto p-4 flex-grow">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <div className="mt-4">
            <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
              {type}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            {new Date(date).toLocaleDateString()}
          </p>
          <div className="prose lg:prose-xl break-words">
            <MathJax>
              <div
                className="break-words overflow-auto"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </MathJax>
          </div>
        </div>
        <div className="lg:w-1/4 lg:pl-8 lg:sticky lg:top-20 h-screen overflow-y-auto">
          <TableOfContents headings={headings} />
        </div>
      </div>
    </MathJaxContext>
  );
};

export default BlogContent;
