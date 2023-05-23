import { Application } from 'express';
import { BMICalculatorRoute } from '../bmicalculator/bmicalculator.route';
import { ExpressRoutesConfig } from '../express/express.routes.config';
import logger from '../shared/logger';

export class Router {
  static routes: ExpressRoutesConfig[] = [];

  static init(app: Application) {
    logger.info('Registering routes & controllers ...');
    this.routes.push(new BMICalculatorRoute(app));
    this.routes.forEach((route: ExpressRoutesConfig) => {
      logger.info(`Routes initialized - /${route.getName()}`);
    });
  }
}
