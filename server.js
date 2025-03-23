import express from "express"
import app from "./app.js"
import cors from "cors";

const server = express();
const PORT = process.env.PORT || 3000;

// ✅ Allowing requests from frontend
server.use(cors({ origin: "http://localhost:5173", credentials: true }));

server.use('/api', app)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});