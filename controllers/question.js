import QuestionModel from "../models/question.js";

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
    try{
        const question = await QuestionModel.findOne({ _id: req.params.id });

        if (question.user_id === req.body.user_id){
            const response = await question.deleteOne();

            return res
                .status(200)
                .json({ status: "question deleted", response });
        }else {
            return res
                .status(401)
                .json({ status: "this is not your question"});
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong." });
    }
}

export { POST_QUESTION, DELETE_QUESTION, }