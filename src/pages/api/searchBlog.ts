import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../db/dbConnect";
import Document from "../../models/document.model";

interface DocumentSnippet {
  title: string;
  date: string;
  type: string;
  body: string;
  access: 1 | 2 | 3;
  isTitleMatch: boolean;
  isBodyMatch: boolean;
}

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function getRelevantSnippet(
  body: string,
  searchTerm: string,
  isTitleMatch: boolean
): string {
  if (isTitleMatch) {
    return body.substring(0, 150);
  } else {
    const index = body.toLowerCase().indexOf(searchTerm.toLowerCase());
    const start = Math.max(index - 75, 0);
    const end = Math.min(start + 150, body.length);
    return body.substring(start, end);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const { query, access } = req.query;

    try {
      let documents;
      
      if (query && typeof query === "string") {
        const escapedQuery = escapeRegex(query);
        const regex = new RegExp(escapedQuery, "i");

        documents = await Document.find();
        documents = documents
          .map((doc) => {
            const isTitleMatch = regex.test(doc.title);
            const isBodyMatch = regex.test(doc.body);
            const snippet = getRelevantSnippet(doc.body, query, isTitleMatch);

            return {
              title: doc.title,
              date: doc.date,
              type: doc.type,
              body: snippet,
              access: doc.access,
              isTitleMatch,
              isBodyMatch,
            };
          })
          .filter((doc) => doc.isTitleMatch || doc.isBodyMatch);
      } else {
        documents = await Document.find();
      }

      // Filter by access level if provided
      if (access && typeof access === "string") {
        const accessLevel = parseInt(access);
        documents = documents.filter((doc) => doc.access <= accessLevel);
      }

      // Sort documents by date in descending order
      documents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      res.status(200).json(documents);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error searching for documents", error: err });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}