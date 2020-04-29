import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import BugSchema from "../models/Bug";
import NoteSchema from "../models/Note";
import ProfileSchema from "../models/Profile";
import BookSchema from "../models/Book"

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Bugs = mongoose.model("Bug", BugSchema);
  Notes = mongoose.model("Note", NoteSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Books = mongoose.model("Book", BookSchema);
}

export const dbContext = new DbContext();
