import React, { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import TableOfContents from "./TableOfContents";

interface BlogContentProps {
  title: string;
  type: string;
  date: Date; // Changed to Date type
  body: string;
}

interface Heading {
  id: string;
  text: string;
  tagName: string;
}

function extractHeadings(html: string): Heading[] {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const headings = Array.from(tmp.querySelectorAll("h2")).map((heading) => ({
    id: heading.id,
    text: heading.textContent || "",
    tagName: heading.tagName,
  }));
  return headings;
}

const BlogContent: React.FC<BlogContentProps> = ({ title, type, date, body }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (window.location.hash) {
      const elementId = window.location.hash.substring(1).toLowerCase();
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView();
        setTimeout(() => {
          window.scrollBy(0, -35);
        }, 100);
      }
    }

    setHeadings(extractHeadings(body));
  }, [body]);

  return (
    <MathJaxContext>
      <br />
      <br />
      <br />

      <div className="blog-content-container">
        <div className="flex flex-col lg:flex-row">
          <div className="max-w-3xl mx-auto p-4 flex-grow">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-4">
                {date.toLocaleDateString()} {/* Using Date object directly */}
              </p>
            </div>
            <div className="prose lg:prose-xl break-words">
              <MathJax>
                <div className="scoped-styles">
                  <div className="break-words overflow-auto" dangerouslySetInnerHTML={{ __html: body }} />
                </div>
              </MathJax>
            </div>
            <br />
            <span className="inline-block bg-gray-300 text-black-200 text-xs px-2 py-1 rounded-full">{type}</span>
          </div>
          <div className="w-1/2 lg:pl-8 right lg:sticky min-w-[250px]">
            <TableOfContents headings={headings} />
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default BlogContent;
