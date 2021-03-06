import mongoose from "mongoose";
import ValueSchema from "../models/Value";
// import BugSchema from "../models/Bug";
// import NoteSchema from "../models/Note";
import ProfileSchema from "../models/Profile";
import BookSchema from "../models/Book"
import CommentSchema from "../models/Comment"
import BackgroundImageSchema from "../models/BackgroundImage"
import CharacterImageSchema from "../models/CharacterImage"
import PagesSchema from "../models/Page"
import CanvasSchema from "../models/Book"

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  // Bugs = mongoose.model("Bug", BugSchema);
  // Notes = mongoose.model("Note", NoteSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Books = mongoose.model("Book", BookSchema);
  Comments = mongoose.model("Comment", CommentSchema);
  BackgroundImage = mongoose.model("BackgroundImage", BackgroundImageSchema)
  CharacterImage = mongoose.model("CharacterImage", CharacterImageSchema)
  Pages = mongoose.model("Page", PagesSchema)
  Canvas = mongoose.model("Canvas", CanvasSchema)
}

export const dbContext = new DbContext();
