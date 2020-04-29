import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BackgroundImageService {

    async getAll() {
        return await dbContext.BackgroundImage.find()
    }

    async getById(id){
        let data = await dbContext.BackgroundImage.findOne({_id: id})
        if (!data) {
            throw new BadRequest("Invalid ID")
          }
          return data
    }

    async create(rawData){
        let data = await dbContext.BackgroundImage.create(rawData)
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

export const backgroundImageService = new BackgroundImageService();
