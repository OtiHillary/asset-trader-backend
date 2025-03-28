import express from 'express'
import * as controllers from '../controllers/index.js';
import { rolesRequired } from '../middlewares/rolesMiddleware.js';
// import { rolesRequired } from '../middlewares/rolesMiddleware.js';

const getUserRouter = express()

getUserRouter.post('/get-account', rolesRequired('all'), controllers.getAccountDetails)
getUserRouter.get('/get-user', rolesRequired('all'), controllers.getUser)

export default getUserRouter;