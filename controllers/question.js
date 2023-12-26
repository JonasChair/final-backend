import QuestionModel from "../models/question.js";

const POST_QUESTION = async (req, res) => {
    try {
        const question = new QuestionModel({
            question_text: req.body.question_text,
            date: new Date(),
            user_id: req.body.userId,
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

export { POST_QUESTION, }