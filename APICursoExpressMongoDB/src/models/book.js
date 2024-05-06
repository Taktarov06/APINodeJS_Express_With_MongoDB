import mongoose, { Schema } from "mongoose";
import { authorSchema } from "./Author.js";

const bookSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true},
    pagerNumber: { type: Number },
    Price: { type: String, required: true},
    Group: { type: String },
    Editor: { type: String },
    author: authorSchema
    // author: {type: mongoose.Schema.Types.ObjectId, ref: 'authors', required: true},
    // Metodo acima é usado para cadastrar um livro junto com o autor por referencia
}, { versionKey: false });

const book = mongoose.model("books", bookSchema);

export default book