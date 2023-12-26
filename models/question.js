import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    id: { type: String },
    question_text: { type: String, required: true},
    date: { type: Date, required: true},
    user_id: { type: String, required: true},
    likes: [{ type: String}],
    dislikes: [{ type: String}]
});

export default mongoose.model("Question", questionSchema);