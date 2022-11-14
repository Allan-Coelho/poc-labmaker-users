import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import user_router from "./routes/User.routes.js";
dotenv.config();
var server = express();
server.use(cors()).use(express.json()).use(user_router);
server.listen(process.env.PORT);
