import { ENABLE_MONGO, MONGO_URI, MONGO_CLIENT_OPTIONS, MONGO_DBNAME } from '../settings/mongo.setting.mjs';

import { Logger } from '../utils/logger.mjs';
import { MongoClient, ObjectId } from 'mongodb';

const MONGO_CLIENT = !!ENABLE_MONGO ? new MongoClient(MONGO_URI, { ...MONGO_CLIENT_OPTIONS }) : null;

const connectToMongo = async client => {
    if (!!ENABLE_MONGO && client) {
        await client.connect();
    }
}

const closeMongo = async client => {
    if (!!ENABLE_MONGO && client) {
        await client.close();
    }
}

const MongoCollection = name => {
    if (!!ENABLE_MONGO && name) {
        return MONGO_CLIENT.db(MONGO_DBNAME).collection(name);
    }
}

const MongoId = id => {
    if (!!ENABLE_MONGO && id) {
        return new ObjectId(id);
    }
}

if (!!ENABLE_MONGO) {
    connectToMongo(MONGO_CLIENT).then(() => {
        Logger.log('info', `Mongo Client is ready to use`);
    }).catch(() => {
        Logger.log('error', `Can't connect to Mongo`);
    });
}

export {
    MONGO_CLIENT,
    connectToMongo,
    closeMongo,
    MongoCollection,
    MongoId
}
