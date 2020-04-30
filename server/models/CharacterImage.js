import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Character  = new Schema(
    {
        title: { type: String, required: true },
        backgroundImageId: {type:String, required: true},
        imgUrl: { type: String, required: false },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

Book.virtual("creator", {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
});

export default Character;
