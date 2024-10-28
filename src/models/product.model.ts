import mongoose, { Schema } from 'mongoose';
import modelOptions from '.';

export default mongoose.model(
  'Product',
  new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: false },
      price: { type: Number, required: true },
      discount: { type: Number, required: false },
      imageUrl: { type: String, required: false },
      categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    },
    modelOptions,
  ),
  'products',
);
