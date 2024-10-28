import mongoose, { Schema } from 'mongoose';
import modelOptions from '.';

export default mongoose.model(
  'Test',
  new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: false },
      embedding: { type: Array, required: false },
    },
    modelOptions,
  ),
  'gemini-ai',
);
