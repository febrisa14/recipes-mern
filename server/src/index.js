import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {UserRouter} from "./routes/users.js";

const app = express();

app.use(express.json())
app.use(cors())

app.use("/auth", UserRouter);

mongoose.connect("mongodb://127.0.0.1:27017/mern_recipes")
    .then(()=> {
        console.log('Database connected');
    })
    .catch((error)=> {
        console.log(error);
    });

app.listen("5000", () => console.log("Server started"))
