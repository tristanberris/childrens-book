import express from "express";
import BaseController from "../utils/BaseController";
import { characterImageService } from "../services/CharacterImageService.js";
import auth0Provider from "@bcwdev/auth0provider";

export class CharacterImageController extends BaseController {
  constructor() {
    super("api/characters");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getById)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create);
  }
  async getAll(req, res, next) {
    try {
      let data = await characterImageService.getAll()
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async getById(req,res,next){
      try {
          let data = await characterImageService.find({characterImageId : req.params.id})
          return res.send(data)
      } catch (error) {
          next(error)
      }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creator = req.user.email;
      let data = await characterImageService.create(req.body)
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  
}
