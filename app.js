import express from 'express'
import { RequestMiddleware } from './middlewares/index.js';
import * as routers from './routers/index.js'


const app = express();

app.use(express.json());
app.use(RequestMiddleware);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/auth", routers.AuthRouter);
app.use("/trades", routers.TradeRouter);


export default app;