import express from "express";

import * as controller from '../controllers/index.js';


const AuthRouter = express()

AuthRouter.get('/user', (req, res, next) => {
  return next(new Error("Some error here"))
})

AuthRouter.post('/login', controller.Login)
AuthRouter.post('/signup', controller.Signup)
AuthRouter.post('/get-details', controller.GetBankName)
AuthRouter.get('/get-banks', controller.getBanks)

export default AuthRouter