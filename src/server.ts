import express, { Router } from "express";
import path from "path";

import { ErrorMiddleware } from "./infraestructure";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private port: number;
  private routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  middlewares() {
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));

    this.app.use("/api/v1", this.routes);

    this.app.use("/docs", express.static(path.join(__dirname, "../apidoc")));
  }

  logErrors() {
    this.app.use(ErrorMiddleware.handleError);
  }

  start() {
    this.middlewares();

    this.logErrors();

    this.listen();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
