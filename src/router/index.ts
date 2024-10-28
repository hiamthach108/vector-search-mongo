import { Router } from 'express';
import { respServerError } from '../config/helpers/resp.helper';

import geminiRouter from './gemini.route';

const router = Router();

router.get('/ping', (req, res) => {
  res.send({
    message: 'pong',
  });
});

router.use((req, res, next) => {
  try {
    next();
  } catch (error) {
    return respServerError(res, error.message);
  }
});

router.use('/gemini', geminiRouter);

export default router;
