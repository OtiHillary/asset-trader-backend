// import multer from "multer";
import express from 'express'
import * as controllers from '../controllers/index.js';
import { rolesRequired } from '../middlewares/rolesMiddleware.js';

const TradeRouter = express()

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

TradeRouter.post('/send-trade', rolesRequired('user'), controllers.sendTrade)
TradeRouter.post('/active-trades', rolesRequired('user'), controllers.getTrades)
TradeRouter.get('/all-trades', rolesRequired('admin'), controllers.getAllTrades)

export default TradeRouter;