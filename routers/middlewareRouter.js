import express from 'express';

import { RequestMiddleware } from '../middlewares/index.js';

const MiddlewareRouter = express()
MiddlewareRouter.use(RequestMiddleware)

export default MiddlewareRouter;