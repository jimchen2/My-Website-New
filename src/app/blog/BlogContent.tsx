import React, { useEffect, useState, useRef } from "react";
import { marked } from "marked";
import katex from "katex";
import "katex/dist/katex.min.css";
import TableOfContents from "./TableOfContents";
import "./blog.css";

interface BlogContentProps {
  title: string;
  type: string;
  date: Date;
  body: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(html: string): Heading[] {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const headings = Array.from(tmp.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((heading) => ({
    id: heading.id,
    text: heading.textContent || "",
    level: parseInt(heading.tagName.charAt(1)),
  }));
  return headings;
}

const BlogContent: React.FC<BlogContentProps> = ({ title, type, date, body }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const blogLink = `http://localhost:3000/?title=${encodeURIComponent(title)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(blogLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const renderLatex = (html: string) => {
      const codeBlocks: string[] = [];

      const htmlWithoutCode = html.replace(/(<pre><code>[\s\S]*?<\/code><\/pre>)|(<code>[^<]+<\/code>)/g, (match) => {
        codeBlocks.push(match);
        return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
      });

      const processedHtml = htmlWithoutCode.replace(/\$\$(.*?)\$\$|\$(.*?)\$/g, (match, block, inline) => {
        const latex = block || inline;
        const displayMode = !!block;
        try {
          return katex.renderToString(latex, { displayMode });
        } catch (error) {
          console.error("KaTeX error:", error);
          return match;
        }
      });

      return processedHtml.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => codeBlocks[parseInt(index)]);
    };

    const renderMarkdown = () => {
      if (contentRef.current) {
        const renderer = new marked.Renderer();
        renderer.heading = (text, level) => {
          console.log("Heading:", { text, level });
          const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
          return `<h${level} id="${escapedText}">${text}</h${level}>`;
        };

        marked.use({ renderer });

        const renderedMarkdown = marked(body);
        console.log("Rendered markdown:", renderedMarkdown);

        const htmlWithLatex = renderLatex(renderedMarkdown);
        console.log("HTML with LaTeX:", htmlWithLatex);

        contentRef.current.innerHTML = htmlWithLatex;
        const extractedHeadings = extractHeadings(htmlWithLatex);
        console.log("Extracted headings:", extractedHeadings);
        setHeadings(extractedHeadings);
      }
    };

    renderMarkdown();
    
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
  }, [body]);

  return (
    <div className="blog-content-container">
      <div className="flex flex-col lg:flex-row">
        <div className="max-w-3xl mx-auto p-4 flex-grow">
          <br />
          <br />
          <br />

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <button
              onClick={copyLink}
              className="ml-4 px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-4">{date.toLocaleDateString()}</p>
          </div>
          <div className="scoped-styles prose lg:prose-xl break-words">
            <div ref={contentRef} className="break-words" />
          </div>
          <br />
          <span className="inline-block bg-gray-300 text-black-200 text-xs px-2 py-1 rounded-full">{type}</span>
        </div>
        <div className="w-1/2 lg:pl-8 right lg:sticky min-w-[250px]">
          <TableOfContents headings={headings} />
        </div>
      </div>
    </div>
  );
};

export default BlogContent;