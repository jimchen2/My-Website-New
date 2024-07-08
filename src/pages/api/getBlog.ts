import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../db/dbConnect"; // Adjust the path as necessary
import Document from "../../models/document.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const { title, type } = req.query;

    let query: { title?: string; type?: string; access: number } = { access: 1 };

    if (title) {
      query.title = title as string;
    }

    if (type) {
      query.type = type as string;
    }

    try {
      const documents = await Document.find(query);
      res.status(200).json(documents);
    } catch (err) {
      res.status(500).json({ message: "Error fetching documents", error: err });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}