export type CreateProductDto = {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId?: string;
};
