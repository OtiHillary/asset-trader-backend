import express from 'express'
import * as controllers from '../controllers/index.js';

const DetailRouter = express()

DetailRouter.get('', controllers.Details)

export default DetailRouter;