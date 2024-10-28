import { Router } from 'express';

import { GoogleGenerativeAI } from '@google/generative-ai';
import testModel from '../models/test.model';

const genAI = new GoogleGenerativeAI('');

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const embedModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });

const router = Router();

router.get('/chat', async (req, res) => {
  const prompt = 'Explain how AI works';

  const result = await model.generateContent(prompt);

  res.send({
    success: true,
    message: result.response.text(),
  });
});

router.get('/embedding', async (req, res) => {
  const text = 'Do you know a quick response device?';

  const data = await testModel.find();

  const result = await embedModel.embedContent(text);

  const embedded = result.embedding.values;

  const search = await testModel.aggregate([
    {
      $vectorSearch: {
        index: 'vector_index', // Name of Vector Search Index
        queryVector: embedded, // Query Vector
        path: 'embedding', // Field containing Vectors
        limit: 1, // Number of results to return
        numCandidates: data.length, // Number of candidates to retrieve
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        score: 1,
      },
    },
  ]);

  res.send({
    success: true,
    // message: result.response.text(),
    // data,
    message: text,
    search,
    // message: embedded,
  });
});

export default router;
