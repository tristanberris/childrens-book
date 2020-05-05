import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class PagesService {

    async getAll() {
        return await dbContext.Pages.find()
    }

    async getById(id){
        let data = await dbContext.Pages.find({_id: id})
        if (!data) {
            throw new BadRequest("Invalid ID")
          }
          return data
    }

    async create(rawData){
        let data = await dbContext.Pages.create(rawData)
    }

    // async edit(id, update){
    //     let data = await dbContext.Pages.findOneAndUpdate({_id: id}, update, {new:true})
    // }


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

export const pagesService = new PagesService();
