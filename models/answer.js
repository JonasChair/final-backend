import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
    id: { type: String },
    answer_text: { type: String, required: true},
    date: { type: Date, required: true},
    user_id: { type: String, required: true},
    question_id: { type: String, required: true},
    likes: [{ type: String}],
    dislikes: [{ type: String}]
});

export default mongoose.model("Answer", answerSchema);