import { RequestHandler } from 'express';

import categoryModel from '../models/category.model';
import { CreateCategoryDto } from '../dtos/category/create-category.dto';
import {
  respBadRequest,
  respCreated,
  respNotFound,
  respOk,
  respServerError,
} from '../config/helpers/resp.helper';
import productModel from '../models/product.model';

export const createCategory: RequestHandler = async (req, res) => {
  try {
    const body = req.body as CreateCategoryDto;
    if (!body) {
      return respBadRequest(res, 'Invalid body');
    }
    if (!body.name) {
      return respBadRequest(res, 'Name is required');
    }

    const category = await categoryModel.create(body);

    return respCreated(res, 'Category created successfully', {
      data: category.toObject(),
    });
  } catch (error) {
    return respServerError(res, error.message);
  }
};

export const getCategories: RequestHandler = async (req, res) => {
  try {
    const { page, pageSize } = req.query;

    const p = parseInt(page as string, 10) || 1;
    const s = parseInt(pageSize as string, 10) || 10;

    const total = await categoryModel.countDocuments();

    const categories = await categoryModel
      .find()
      .skip((p - 1) * s)
      .limit(s);

    return respOk(res, 'ok', {
      data: categories || [],
      page: p,
      pageSize: s,
      total,
    });
  } catch (error) {
    return respServerError(res, error.message);
  }
};

export const getCategory: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return respBadRequest(res, 'Invalid ID');
    }

    const category = await categoryModel.findById(id);
    if (!category) {
      return respNotFound(res, 'Category not found');
    }

    return respOk(res, 'Category retrieved successfully', {
      data: category.toObject(),
    });
  } catch (error) {
    return respServerError(res, error.message);
  }
};

export const updateCategory: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return respBadRequest(res, 'Invalid ID');
    }

    const body = req.body as CreateCategoryDto;
    if (!body) {
      return respBadRequest(res, 'Invalid body');
    }

    const category = await categoryModel.findByIdAndUpdate(id, body, { new: true });
    if (!category) {
      return respNotFound(res, 'Category not found');
    }

    return respOk(res, 'Category updated successfully', {
      data: category.toObject(),
    });
  } catch (error) {
    return respServerError(res, error.message);
  }
};

export const deleteCategory: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return respBadRequest(res, 'Invalid ID');
    }

    // delete product has category id
    await productModel.deleteMany({ categoryId: id });

    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return respNotFound(res, 'Category not found');
    }

    return respOk(res, 'Category deleted successfully');
  } catch (error) {
    return respServerError(res, error.message);
  }
};
