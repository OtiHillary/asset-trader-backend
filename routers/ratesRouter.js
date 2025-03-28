import express from 'express'
import * as controllers from '../controllers/index.js';
import { rolesRequired } from '../middlewares/rolesMiddleware.js';

const RatesRouter = express()

RatesRouter.post('/set-rate', rolesRequired('admin'), controllers.setRate)
RatesRouter.get('/get-rates', rolesRequired('all'), controllers.getAllRates)
RatesRouter.post('/set-bulk-rates', rolesRequired('admin'), controllers.setBulkRates)

export default RatesRouter;