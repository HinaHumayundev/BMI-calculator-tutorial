import { Application, Request, Response } from 'express';
import { ExpressRoutesConfig } from '../express/express.routes.config';
import { countOverweight, readAndUpsertResults } from './controller/bmicalculator.controller';

export class BMICalculatorRoute extends ExpressRoutesConfig {
  route: string = 'bmi-calculator';

  constructor(app: Application) {
    super(app, '/bmi-calculator');
  }

  configure() {
    this.app.get(`${this.route}/overweight/count`, async (req: Request, res: Response) => {
      try {
        await readAndUpsertResults();
        const count = await countOverweight();
        res.json({ result: `Total number of overweight person(s) are ${count}.` });
      } catch (err) {
        res.status(500).json(err);
      }
    });
  }
}
