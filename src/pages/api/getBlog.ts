import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../db/dbConnect"; // Adjust the path as necessary
import Document from "../../models/document.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const { title, type } = req.query;

    let query: { title?: string; type?: string } = {};

    if (title) {
      query.title = title as string;
    }

    if (type) {
      query.type = type as string;
    }

    try {
      const allDocuments = await Document.find(query);
      
      const documents = allDocuments.filter(doc => doc.access === 1);

      const sanitizedDocuments = documents.map(({ access, ...rest }) => rest);

      res.status(200).json(sanitizedDocuments);
    } catch (err) {
      res.status(500).json({ message: "Error fetching documents", error: err });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}