import express from "express";
import "dotenv/config";

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`App running on port: ${process.env.PORT}`);
})