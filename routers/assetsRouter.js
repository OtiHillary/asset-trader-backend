import express from 'express'
import * as controllers from '../controllers/index.js';
import { rolesRequired } from '../middlewares/index.js';

const AssetsRouter = express()

AssetsRouter.post('/create-crypto-wallet', rolesRequired('user'), controllers.createAsset)
AssetsRouter.post('/get-crypto-balance', rolesRequired('user'), controllers.getCryptoBalance)
AssetsRouter.post('/get-token-balance', rolesRequired('user'), controllers.getTokenBalance)
AssetsRouter.post('/send-crypto', rolesRequired('user'), controllers.sendFromCrypto)

export default AssetsRouter;