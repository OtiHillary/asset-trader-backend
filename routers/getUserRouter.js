import express from 'express'
import * as controllers from '../controllers/index.js';
// import { rolesRequired } from '../middlewares/rolesMiddleware.js';

const getUserRouter = express()

getUserRouter.post('/get-account', controllers.getAccountDetails)
getUserRouter.get('/get-user', controllers.getUser)

export default getUserRouter;