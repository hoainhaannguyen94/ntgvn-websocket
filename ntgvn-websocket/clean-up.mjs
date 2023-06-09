import { Logger } from './utils/logger.mjs';
import { ENABLE_MONGO } from './settings/mongo.setting.mjs';
import { closeMongo, MONGO_CLIENT } from './mongodb/mongodb.mjs';

const cleanUp = async eventType => {
    Logger.log('info', `Server is stop from event: ${eventType}`);
    if (ENABLE_MONGO && MONGO_CLIENT) {
        await closeMongo(MONGO_CLIENT);
        Logger.log('info', `Mongo Client connection closed`);
    }
    process.exit();
}

export { cleanUp }
