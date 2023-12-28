import QuestionModel from "../models/question.js";
import AnswerModel from "../models/answer.js";
import mongoose from "mongoose";

const POST_QUESTION = async (req, res) => {
    try {
        const question = new QuestionModel({
            question_text: req.body.question_text,
            date: new Date(),
            user_id: req.body.user_id,
        })

        question.id = question._id;

        const response = await question.save();

        return res
            .status(200)
            .json({ status: "question added", response });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const DELETE_QUESTION = async (req, res) => {
    try {
        const question = await QuestionModel.findOne({ _id: req.params.id });

        if (question.user_id === req.body.user_id) {
            const response = await question.deleteOne();

            return res
                .status(200)
                .json({ status: "question deleted", response });
        } else {
            return res
                .status(401)
                .json({ status: "this is not your question" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const GET_ALL_QUESTIONS = async (req, res) => {
    try {
        const questions = await QuestionModel.find();

        if (!questions) {
            return res
                .status(200)
                .json({ status: "No questions found" });
        } else {
            return res.status(200).json({ questions });
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const POST_ANSWER = async (req, res) => {
    try {
        const answer = new AnswerModel({
            answer_text: req.body.answer_text,
            date: new Date(),
            user_id: req.body.user_id,
            question_id: req.params.id
        })

        answer.id = answer._id;

        const response = await answer.save();

        return res
            .status(200)
            .json({ message: "Answer added", response })
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const DELETE_ANSWER = async (req, res) => {
    try {
        const answer = await AnswerModel.findOne({ _id: req.params.id });

        if (answer.user_id === req.body.user_id) {
            const response = await answer.deleteOne();

            return res
                .status(200)
                .json({ status: "answer deleted", response });
        } else {
            return res
                .status(401)
                .json({ status: "this is not your answer" });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
}

const GET_QUESTION_WITH_ANSWERS = async (req, res) => {
    try {
        const question = await QuestionModel.aggregate([
            {
                $lookup:{
                    from: "answers",
                    localField: "id",
                    foreignField: "question_id",
                    as: "question_answers",
                },
            },
            {$match: { _id: new mongoose.Types.ObjectId(req.params.id)}}
        ])

        return res.status(200).json({ question });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }

}

export { POST_QUESTION, DELETE_QUESTION, GET_ALL_QUESTIONS, POST_ANSWER, DELETE_ANSWER, GET_QUESTION_WITH_ANSWERS }