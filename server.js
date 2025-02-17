import express from "express"
import app from "./app.js"

const server = express();
const PORT = process.env.PORT || 3000;

server.use('/api', app)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});