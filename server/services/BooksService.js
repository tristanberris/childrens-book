import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BooksService {

    async getAll() {
        return await dbContext.Books.find({})
    }

    async getById(id) {
        let data = await dbContext.Books.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Books.create(rawData)
    }

    async edit(id, update) {
        let data = await dbContext.Books.findOneAndUpdate({ _id: id }, update, { new: true })
    }


    //   async findAll(query = {}) {
    //     let values = await dbContext.Values.find(query).populate(
    //       "creator",
    //       "name picture"
    //     );
    //     return values;
    //   }
    //   async findById(id) {
    //     let value = await dbContext.Values.findById(id);
    //     if (!value) {
    //       throw new BadRequest("Invalid Id");
    //     }
    //     return value;
    //   }
}

export const booksService = new BooksService();
