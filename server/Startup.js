import bp from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { RegisterControllers, Paths } from "../Setup";
import auth0Provider from "@bcwdev/auth0provider";
import cleanupService from "./services/TestCleanupService";

export default class Startup {
  static ConfigureGlobalMiddleware(app) {
    // NOTE Configure and Register Middleware
    let whitelist = ["http://localhost:8080", "http://localhost:8081"];
    let corsOptions = {
      origin: function(origin, callback) {
        let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
      },
      credentials: true
    };
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(bp.json({ limit: "50mb" }));

    // NOTE Configures auth0 middleware that is used throughout controllers
    auth0Provider.configure({
      domain: process.env.AUTH_DOMAIN,
      clientId: process.env.AUTH_CLIENT_ID,
      audience: process.env.AUTH_AUDIENCE
    });
  }
  static ConfigureRoutes(app) {
    let router = express.Router();
    RegisterControllers(router);
    app.use(router);
    app.use("", express.static(Paths.Public));
    app.get("/cleanup", async (req, res, next) => {
      try {
        let data = await cleanupService.cleanupAsync();
        res.send(data);
      } catch (e) {
        next(e);
      }
    });
    Startup.registerErrorHandlers(app);
  }

  static registerErrorHandlers(app) {
    // NOTE SEND 404 for any unknown routes
    app.use(
      "*",
      (_, res, next) => {
        res.status(404);
        next();
      },
      express.static(Paths.Public + "404")
    );
    // NOTE Default Error Handler
    app.use((error, req, res, next) => {
      if (!error.status) {
        error.status = 400;
      }
      if (error.status == 500) {
        console.error(error); // should write to external
      }
      res.status(error.status).send({ ...error, url: req.url });
    });
  }
}
