import express, { Application } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from 'cors';

// import routes
import userRoute from './routes/userRoute';
import gptRoute from './routes/gptRoute';

import { MONGO_URI } from "./config/secret";

dotenv.config();
const app: Application = express();

var corsOption = {
  origin: `*`,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  credentials: true,
  exposedHeaders: ["x-auth-token"],
  url: [
    "https://localhost:5000",
  ],
};
app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection open your heart 
const mongoUrl: string = MONGO_URI as string;
mongoose.set('strictQuery', false);
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err: any) => {
    console.error("MongoDB Connection Error!");
    process.exit();
  });

// USE Routes
app.use("/api/users", userRoute);
app.use("/api/gpt", gptRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
