import mongoose, { Schema } from 'mongoose';
import modelOptions from '.';

export default mongoose.model(
  'User',
  new Schema(
    {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    },
    modelOptions,
  ),
  'users',
);
