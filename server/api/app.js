import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";


// initialize express
const app = express();

// connect to the database
mongoose.connect("mongodb://0.0.0.0:27017/sprintplannerdb");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

routes(app);

export default app;