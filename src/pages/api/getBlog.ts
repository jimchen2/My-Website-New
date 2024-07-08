import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../db/dbConnect'; // Adjust the path as necessary
import Document from '../../models/document.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    const { date, type, access } = req.query;

    let query: { date?: string; type?: string; access?: number } = {};

    if (date) {
      query.date = date as string;
    }

    if (type) {
      query.type = type as string;
    }

    if (access) {
      query.access = parseInt(access as string);
    }

    try {
      const documents = await Document.find(query);
      
      if (access) {
        const accessLevel = parseInt(access as string);
        const filteredDocuments = documents.filter(doc => doc.access <= accessLevel);
        return res.status(200).json(filteredDocuments);
      }
      
      res.status(200).json(documents);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching documents', error: err });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}