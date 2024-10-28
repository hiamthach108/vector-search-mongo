import express from 'express';
import http from 'http';
import cors from 'cors';

import bodyParser from 'body-parser';
import { DB_URL, HTTP_PORT } from './src/config/constants/env';
import router from './src/router/index';
import mongoose from 'mongoose';

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const app = express();

// api setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

const port = HTTP_PORT;
const server = http.createServer(app);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');

    server.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
