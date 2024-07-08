import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../db/dbConnect";
import Document from "../../models/document.model";

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function getRelevantSnippet(
  body: string,
  searchTerm: string,
  isTitleMatch: boolean
): string {
  if (isTitleMatch) {
    return body.substring(0, 300);
  } else {
    const index = body.toLowerCase().indexOf(searchTerm.toLowerCase());
    const start = Math.max(index - 150, 0);
    const end = Math.min(start + 300, body.length);
    return body.substring(start, end);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const { query } = req.query;

    try {
      let documents;
      
      if (query && typeof query === "string") {
        const escapedQuery = escapeRegex(query);
        const regex = new RegExp(escapedQuery, "i");

        documents = await Document.find();
        documents = documents
          .filter(doc => doc.access === 1)
          .map((doc) => {
            const isTitleMatch = regex.test(doc.title);
            const isBodyMatch = regex.test(doc.body);
            const snippet = getRelevantSnippet(doc.body, query, isTitleMatch);

            return {
              title: doc.title,
              date: doc.date,
              type: doc.type,
              body: snippet,
              isTitleMatch,
              isBodyMatch,
            };
          })
          .filter((doc) => doc.isTitleMatch || doc.isBodyMatch);
      } else {
        documents = await Document.find();
        documents = documents
          .filter(doc => doc.access === 1)
          .map((doc) => ({
            title: doc.title,
            date: doc.date,
            type: doc.type,
            body: doc.body.substring(0, 300),
          }));
      }

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