import { RequestHandler } from 'express';

import userModel from '../models/user.model';

import {
  respBadRequest,
  respCreated,
  respNotFound,
  respOk,
  respServerError,
} from '../config/helpers/resp.helper';
import { generateAccessToken } from '../config/helpers/jwt.helper';
import { comparePassword, hashPassword } from '../config/helpers/crypto.helper';
import { LoginReq, RegisterReq } from '../dtos/user/auth.dto';

export const register: RequestHandler = async (req, res) => {
  try {
    const body = req.body as RegisterReq;
    if (!body) {
      return respBadRequest(res, 'Invalid body');
    }
    if (!body.username) {
      return respBadRequest(res, 'Username is required');
    }
    if (!body.password) {
      return respBadRequest(res, 'Password is required');
    }

    const exist = await userModel.findOne({ username: body.username });
    if (exist) {
      return respBadRequest(res, 'User existed');
    }

    body.password = await hashPassword(body.password);

    // create usermodel
    const model = {
      username: body.username,
      password: body.password,
    };

    const user = await userModel.create(model);

    if (!user) {
      return respServerError(res, 'Failed to create user');
    }

    const assessTk = generateAccessToken(user._id.toString());

    return respCreated(res, 'User created', {
      assessTk,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    return respServerError(res, error.message);
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const body = req.body as LoginReq;
    if (!body) {
      return respBadRequest(res, 'Invalid body');
    }
    if (!body.username) {
      return respBadRequest(res, 'Username is required');
    }
    if (!body.password) {
      return respBadRequest(res, 'Password is required');
    }

    const user = await userModel.findOne({ username: body.username });
    if (!user) {
      return respNotFound(res, 'User not found');
    }

    const isValidPass = await comparePassword(body.password, user.password);

    if (!isValidPass) {
      return respBadRequest(res, 'Invalid password');
    }

    const accessTk = generateAccessToken(user._id.toString());

    return respOk(res, 'Login success', {
      accessTk,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    return respServerError(res, error.message);
  }
};
