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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Scroll to the hash if present
    if (window.location.hash) {
      const elementId = window.location.hash.substring(1).toLowerCase();
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView();
        setTimeout(() => {
          window.scrollBy(0, -35);
        }, 100); // Adjust the delay as needed
      }
    }

    // Extract headings
    setHeadings(extractHeadings(body));

    // Check if the screen width is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };
    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [body]);

  if (isMobile) {
    return (
      <MathJaxContext>
        <br />
        <br />
        <br />

        <div className="blog-content-container">
          <div className="flex flex-col">
            <div className="overflow-y-auto">
            <br />
        <br />

              <TableOfContents headings={headings} />
            </div>
            <div className="max-w-3xl mx-auto p-4 flex-grow">
              <h1 className="text-2xl font-bold mb-2">{title}</h1>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(date).toLocaleDateString()}
              </p>
              <div className="prose break-words">
                <MathJax>
                  <div className="scoped-styles">
                    <div
                      className="break-words overflow-auto"
                      dangerouslySetInnerHTML={{ __html: body }}
                    />
                  </div>
                </MathJax>
              </div>
              <span className="inline-block bg-gray-300 text-black-200 text-xs px-2 py-1 rounded-full mt-4">
                {type}
              </span>
            </div>
          </div>
        </div>
      </MathJaxContext>
    );
  } else {
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
                  {new Date(date).toLocaleDateString()}
                </p>
              </div>
              <div className="prose lg:prose-xl break-words">
                <MathJax>
                  <div className="scoped-styles">
                    <div
                      className="break-words overflow-auto"
                      dangerouslySetInnerHTML={{ __html: body }}
                    />
                  </div>
                </MathJax>
              </div>
              <br />
              <span className="inline-block bg-gray-300 text-black-200 text-xs px-2 py-1 rounded-full">
                {type}
              </span>
            </div>
            <div className="lg:w-1/4 lg:pl-8 lg:sticky lg:top-20 h-screen overflow-y-auto">
              <TableOfContents headings={headings} />
            </div>
          </div>
        </div>
      </MathJaxContext>
    );
  }
};

export default BlogContent;
