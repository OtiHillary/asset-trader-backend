import express from 'express';

import { RequestMiddleware, rolesRequired } from '../middlewares/index.js';

const MiddlewareRouter = express()
MiddlewareRouter.use(RequestMiddleware)

export default MiddlewareRouter;