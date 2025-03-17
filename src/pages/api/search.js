// pages/api/search.js
import Blog from '../../backend_utils/models/blog.model';
import dbConnect from '../../backend_utils/db/mongoose';

function escapeRegex(text) {
  return text.replace(/[-[$${}()*+?.,\\^$|#\s]/g, "\\$&");
}

function getRelevantSnippet(body, searchTerm, isTitleMatch) {
  if (isTitleMatch) {
    return body.substring(0, 150);
  } else {
    const index = body.toLowerCase().indexOf(searchTerm.toLowerCase());
    const start = Math.max(index - 75, 0);
    const end = Math.min(start + 150, body.length);
    return body.substring(start, end);
  }
}

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    let { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "A search query is required." });
    }

    try {
      query = escapeRegex(query);
      const regex = new RegExp(query, "i");
      const blogs = await Blog.find();

      const matches = blogs
        .map((blog) => {
          const isTitleMatch = regex.test(blog.title);
          const isBodyMatch = regex.test(blog.body);
          const snippet = getRelevantSnippet(blog.body, query, isTitleMatch);

          return {
            ...blog.toObject(),
            body: snippet,
            isTitleMatch,
            isBodyMatch,
            randomTieBreaker: Math.random()
          };
        })
        .filter((blog) => blog.isTitleMatch || blog.isBodyMatch)
        .sort((a, b) => {
          if (a.date !== b.date) {
            return new Date(b.date) - new Date(a.date); // Ensure Date objects for comparison
          }
          return b.randomTieBreaker - a.randomTieBreaker;
        });

      res.json(matches);
    } catch (err) {
      res.status(500).json({ 
        message: "Error searching for blog entries", 
        error: err.message 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}