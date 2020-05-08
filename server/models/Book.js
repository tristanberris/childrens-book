import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Book = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    createdPage: { type: String, required: true },
    imgUrl: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    // canvas: {type:Canvas}
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Canvas = new Schema(
  {
    // title: { type: String, required: true },
    // author: { type: String, required: true },
    // createdPage: { type: String, required: true },
    // // bookId: { type: String, required: true },
    // // closed: { type: Boolean, required: true, default: false},
    // imgUrl: { type: String, required: true },
    // creatorEmail: { type: String, required: true },
    canvas: { type: Object, required: true },
  },
);

Book.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Book;
