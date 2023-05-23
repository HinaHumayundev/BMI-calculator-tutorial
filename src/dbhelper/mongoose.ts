import config from 'config';
import { connect } from 'mongoose';
import logger from '../shared/logger';

export async function initialize() {
  const MONGOOSE_URL: string = config.get('mongoose.url');
  try {
    logger.debug(`Trying to connect to mongodb on ${MONGOOSE_URL}`);
    await connect(
      MONGOOSE_URL,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      () => {
        logger.debug('Connected to mongodb cluster');
      }
    );
  } catch (err) {
    logger.error(`Error connecting to mongodb : ${err}`);
  }
}
