import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../db/dbConnect";
import Document from "../../models/document.model";

function getRelevantSnippet(body: string, searchTerm: string, isTitleMatch: boolean): string {
  const charLimit = 300;
  if (isTitleMatch) {
    return body.substring(0, charLimit);
  } else {
    const index = body.toLowerCase().indexOf(searchTerm.toLowerCase());
    const start = Math.max(index - Math.floor(charLimit / 2), 0);
    const end = Math.min(start + charLimit, body.length);
    return body.substring(start, end);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const { query } = req.query;

    try {
      let documents;
      
      if (query && typeof query === "string") {
        const regex = new RegExp(query, "i");

        documents = await Document.find({
          access: 1,
          $or: [
            { title: regex },
            { body: regex }
          ]
        }).sort({ date: -1 }).lean().exec();

        documents = documents.map((doc) => {
          const isTitleMatch = regex.test(doc.title);
          const snippet = getRelevantSnippet(doc.body, query, isTitleMatch);

          return {
            title: doc.title,
            date: doc.date,
            type: doc.type,
            body: snippet,
            isTitleMatch,
            isBodyMatch: !isTitleMatch,
          };
        });
      } else {
        documents = await Document.find({ access: 1 })
          .sort({ date: -1 })
          .limit(20)
          .lean()
          .exec();

        documents = documents.map((doc) => ({
          title: doc.title,
          date: doc.date,
          type: doc.type,
          body: doc.body.substring(0, 300),
        }));
      }

      res.status(200).json(documents);
    } catch (err) {
      res.status(500).json({ message: "Error searching for documents", error: err });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}