import mongoose, { Schema } from 'mongoose';
import modelOptions from '.';

export default mongoose.model(
  'Category',
  new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: false },
      imageUrl: { type: String, required: false },
    },
    modelOptions,
  ),
  'categories',
);
