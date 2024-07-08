import React from "react";
import Link from "next/link";

interface BlogPreview {
  title: string;
  date: string;
  type: string;
  body: string;
  access: 1 | 2 | 3;
  isTitleMatch: boolean;
  isBodyMatch: boolean;
}

interface PreviewCardProps {
  document: BlogPreview;
  highlightPattern?: string;
}

const highlight = (text: string, pattern?: string) =>
  pattern
    ? text.split(new RegExp(`(${pattern})`, "gi")).map((part, index) =>
        part.match(new RegExp(`(${pattern})`, "gi")) ? (
          <span key={index} className="font-black">
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
  document,
  highlightPattern,
}) => {
  const formattedTitle = document.title.toLowerCase().replace(/\s+/g, '-');
  const linkHref = `/${document.type}/${formattedTitle}`;

  return (
    <li className="shadow-lg rounded-lg p-6 max-w-screen-lg mx-auto transition hover:bg-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 flex justify-between items-center">
        <Link href={linkHref}>
          <span className="hover:underline">{document.title}</span>
        </Link>
        <span className="text-sm bg-gray-200 px-2 py-1 rounded">{document.type}</span>
      </h2>
      <p className="text-gray-500 text-sm font-mono">
        {new Date(document.date).toLocaleDateString()}
      </p>
      <p className="mt-4 text-gray-700 break-words truncate font-sans">
        {highlight(truncateText(document.body, 150), highlightPattern)}
      </p>
    </li>
  );
};

export default PreviewCard;