import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => console.log("DB CONNECTION ESTABLISHED!"))
    .catch((err) => {
        console.log(err);
    });

app.listen(process.env.PORT, () => {
    console.log(`App running on port: ${process.env.PORT}`);
});