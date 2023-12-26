import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import questionRoute from "./routes/question.js";
import "dotenv/config";

const app = express();

app.use(express.json());

app.use("/users", userRoute);
app.use("/questions", questionRoute);

app.use((req, res) => {
    return res.status(404).json({ response: "Endpoint does not exist!" })
});

mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => console.log("DB CONNECTION ESTABLISHED!"))
    .catch((err) => {
        console.log(err);
    });

app.listen(process.env.PORT, () => {
    console.log(`App running on port: ${process.env.PORT}`);
});