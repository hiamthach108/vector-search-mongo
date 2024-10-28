import { RequestHandler } from 'express';

import productModel from '../models/product.model';

import {
  respBadRequest,
  respCreated,
  respNotFound,
  respOk,
  respServerError,
} from '../config/helpers/resp.helper';

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return respBadRequest(res, 'Invalid body');
    }
    if (!body.name) {
      return respBadRequest(res, 'Name is required');
    }
    if (!body.price) {
      return respBadRequest(res, 'Price is required');
    }
    if (!body.categoryId) {
      return respBadRequest(res, 'Category ID is required');
    }

    const product = await productModel.create(body);

    return respCreated(res, 'Product created successfully', {
      data: product.toObject(),
    });
  } catch (error) {
    return respServerError(res, error.message);
  }
};

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const { page, pageSize } = req.query;

    const p = parseInt(page as string, 10) || 1;
    const s = parseInt(pageSize as string, 10) || 10;

    const total = await productModel.countDocuments();

    const products = await productModel
      .find()
      .skip((p - 1) * s)
      .limit(s);

    return respOk(res, 'ok', {
      data: products || [],
      page: p,
      pageSize: s,
      total,
    });
  } catch (error) {
    return respServerError(res, error.message);
  }
};

export const getProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return respBadRequest(res, 'Invalid ID');
    }

    const product = await productModel.findById(id);
    if (!product) {
      return respNotFound(res, 'Product not found');
    }

    return respOk(res, 'Product retrieved successfully', {
      data: product.toObject(),
    });
  } catch (error) {
    return respServerError(res, error.message);
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return respBadRequest(res, 'Invalid ID');
    }

    const body = req.body;
    if (!body) {
      return respBadRequest(res, 'Invalid body');
    }

    const product = await productModel.findByIdAndUpdate(id, body, { new: true });
    if (!product) {
      return respNotFound(res, 'Product not found');
    }

    return respOk(res, 'Product updated successfully', {
      data: product.toObject(),
    });
  } catch (error) {
    return respServerError(res, error.message);
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return respBadRequest(res, 'Invalid ID');
    }

    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return respNotFound(res, 'Product not found');
    }

    return respOk(res, 'Product deleted successfully', {
      data: product.toObject(),
    });
  } catch (error) {
    return respServerError(res, error.message);
  }
};
