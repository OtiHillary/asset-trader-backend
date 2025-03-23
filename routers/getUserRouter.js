import express from 'express'
import * as controllers from '../controllers/index.js';
import { rolesRequired } from '../middlewares/rolesMiddleware.js';

const getUserRouter = express()

getUserRouter.post('/get-account', rolesRequired('user'), controllers.getUser)
getUserRouter.get('/get-user', rolesRequired('user'), controllers.getAccountDetails)

export default getUserRouter;