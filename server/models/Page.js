import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId

const Page = new Schema(
  {
    bookId: { type: ObjectId, ref: "Book", required: true },
    // bookId: { type: String, required: true },
    imgUrl: {type: String, required: true},
    pageNumber: {type: String, required: true}
    
    
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Page.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Page;
