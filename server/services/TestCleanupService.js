import mongoose from "mongoose";
import { dbContext } from "../db/DbContext";

class CleanupService {
  async cleanupAsync() {
    await Promise.allSettled([
      dbContext.Bugs.deleteMany({ reportedBy: "D$" }),
      dbContext.Notes.deleteMany({ reportedBy: "D$" })
    ]);
    return { message: "Deleted all test data!" };
  }
}

const cleanupService = new CleanupService();
export default cleanupService;
