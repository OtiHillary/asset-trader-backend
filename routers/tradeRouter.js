import express from 'express'
import * as controllers from '../controllers/index.js';

const TradeRouter = express()

TradeRouter.post('/send-trade', controllers.sendTrade)
TradeRouter.get('/active-trades', controllers.getTrades)
TradeRouter.get('/all-trades', controllers.getAllTrades)

export default TradeRouter;