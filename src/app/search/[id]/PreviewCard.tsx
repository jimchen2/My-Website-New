import React from "react";
import Link from "next/link";

interface BlogPreview {
  _id: string;
  title: string;
  date: string;
  body: string;
  type: string;
}

interface PreviewCardProps {
  blog: BlogPreview;
  highlightPattern?: string;
}

const highlight = (text: string, pattern?: string) =>
  pattern
    ? text.split(new RegExp(`(${pattern})`, "gi")).map((part, index) =>
        part.match(new RegExp(`(${pattern})`, "gi")) ? (
          <span key={index} className=" font-bold">
            {part}
          </span>
        ) : (
          part
        )
      )
    : text;

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

const PreviewCard: React.FC<PreviewCardProps> = ({
  blog,
  highlightPattern,
}) => (
  <li className="shadow-lg rounded-lg p-6 max-w-screen-lg mx-auto transition hover:bg-gray-200">
    <h2 className="text-2xl font-bold text-gray-800 flex justify-between items-center">
      <Link href={`/blog/${blog.date}`}>
        <span className="hover:underline">{blog.title}</span>
      </Link>
      {blog.type}
    </h2>
    <p className="text-gray-500 text-sm font-mono">
      {new Date(blog.date).toLocaleDateString()}
    </p>
    <p className="mt-4 text-gray-700 break-words truncate font-sans">
      {highlight(truncateText(blog.body, 150), highlightPattern)}
    </p>
  </li>
);

export default PreviewCard;
