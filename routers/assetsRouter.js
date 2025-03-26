import express from 'express'
import * as controllers from '../controllers/index.js';
// import { rolesRequired } from '../middlewares/index.js';

const AssetsRouter = express()

AssetsRouter.post('/create-crypto-wallet', controllers.createAsset)
AssetsRouter.post('/get-crypto-balance', controllers.getCryptoBalance)
AssetsRouter.post('/get-token-balance', controllers.getTokenBalance)
AssetsRouter.post('/send-crypto', controllers.sendFromCrypto)

export default AssetsRouter;