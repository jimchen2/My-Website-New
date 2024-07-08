import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../db/dbConnect";
import Document from "../../models/document.model";

interface DocumentEntry {
  title: string;
  date: Date;
  access: 1 | 2 | 3;
}

type DocumentsByType = {
  [key: string]: DocumentEntry[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Fetch all documents
      const documents = await Document.find({}, 'title date type access');

      // Group documents by type
      const documentsByType: DocumentsByType = documents.reduce((acc: DocumentsByType, doc) => {
        if (!acc[doc.type]) {
          acc[doc.type] = [];
        }
        acc[doc.type].push({
          title: doc.title,
          date: new Date(doc.date),
          access: doc.access
        });
        return acc;
      }, {});

      // Sort types by the number of documents in each type (descending)
      const sortedTypes = Object.entries(documentsByType)
        .sort((a, b) => b[1].length - a[1].length)
        .map(([type, docs]) => ({
          type,
          documents: docs.sort((a, b) => {
            // Sort documents within each type by date (ascending)
            return a.date.getTime() - b.date.getTime();
          }),
        }));

      res.status(200).json(sortedTypes);
    } catch (err) {
      res.status(500).json({ message: "Error fetching document previews", error: err });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}