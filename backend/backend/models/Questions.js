import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    asker: {type:String,required: true},
    topic: { type: String, required: true },
    question: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    __v: { type: Number, default: 0 },
    answers: [
        {
            user: { type: String, default: "Anonymous" },
            text: { type: String, required: true },
            upvotes: { type: Number, default: 0 },
            verified: { type: Boolean, default: false },
            _id: mongoose.Schema.Types.ObjectId,
        },
    ],
});

const questionModel = mongoose.model("Question", QuestionSchema);
export default questionModel;
