import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CharacterImageService {

    async getAll() {
        return await dbContext.CharacterImage.find()
    }

    async getById(id){
        let data = await dbContext.CharacterImage.findOne({_id: id})
        if (!data) {
            throw new BadRequest("Invalid ID")
          }
          return data
    }

    async create(rawData){
        let data = await dbContext.CharacterImage.create(rawData)
        return data
    }


}

export const characterImageService = new CharacterImageService();
