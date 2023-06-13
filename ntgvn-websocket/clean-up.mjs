import { Logger } from './utils/logger/logger.mjs';
import { ENABLE_MONGO } from './config/mongo.mjs';
import { closeMongo, MONGO_CLIENT } from './utils/mongodb/mongodb.mjs';

const cleanUp = async (eventType, eventDetails) => {
    Logger.log('info', `Server is stop from event::${eventType}`, eventDetails);
    if (ENABLE_MONGO && MONGO_CLIENT) {
        await closeMongo(MONGO_CLIENT);
        Logger.log('info', `Mongo Client connection closed`);
    }
    process.exit();
}

export { cleanUp }
