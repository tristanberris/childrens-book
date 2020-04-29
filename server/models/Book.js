import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Book = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    story: { type: String, required: true },
    bookId: { type: String, required: true },
    closed: { type: Boolean, required: true, default: false},
    
    creatorEmail: { type: String, required: true },
    
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Book.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Book;
