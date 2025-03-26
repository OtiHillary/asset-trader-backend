import express from 'express'
import * as controllers from '../controllers/index.js';
// import { rolesRequired } from '../middlewares/rolesMiddleware.js';

const RatesRouter = express()

RatesRouter.post('/set-rate', controllers.setRate)
RatesRouter.get('/get-rates', controllers.getAllRates)
RatesRouter.post('/set-bulk-rates', controllers.setBulkRates)

export default RatesRouter;