import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    bookId: { type: String, required: true },
    body: { type: String, required: true },
    creatorEmail: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Comment.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Comment;