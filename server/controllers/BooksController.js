import express from "express";
import BaseController from "../utils/BaseController";
import { booksService } from "../services/BooksService";
import auth0Provider from "@bcwdev/auth0provider";

export class BooksController extends BaseController {
  constructor() {
    super("api/books");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getById)
      .put("", this.edit)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create);
  }
  async getAll(req, res, next) {
    try {
      let data = await booksService.getAll()
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async getById(req,res,next){
      try {
          let data = await booksService.find({bookId : req.params.id})
          return res.send(data)
      } catch (error) {
          next(error)
      }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creator = req.userInfo.email;
      let data = await booksService.create(req.body)
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  //NOTE: verify that userEmail is needed
  async edit(req,res,next){
      try {
          let data = await booksService.put(req.params.id, req.userInfo.email, req.body)
          return res.send(data)
      } catch (error) {
          next(error)
      }
  }
}
