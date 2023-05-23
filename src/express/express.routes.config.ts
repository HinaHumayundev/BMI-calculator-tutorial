import { Application } from 'express';

export abstract class ExpressRoutesConfig {
  app: Application;
  route: string;

  constructor(app: Application, routeName: string) {
    this.app = app;
    this.route = routeName;
    this.configure();
  }

  getName() {
    return this.route;
  }

  abstract configure(): void;
}
