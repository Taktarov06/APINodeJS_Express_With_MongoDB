import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String, required: true },
        nacionality: { type: String }
    }, { versionKey: false });

const author = mongoose.model("Authors", authorSchema);

export { author, authorSchema };