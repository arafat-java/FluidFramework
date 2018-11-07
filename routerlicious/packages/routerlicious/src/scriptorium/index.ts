import { Provider } from "nconf";
import { IPartitionLambdaFactory } from "../kafka-service/lambdas";
import * as services from "../services";
import * as utils from "../utils";
import { ScriptoriumLambdaFactory } from "./lambdaFactory";

export async function create(config: Provider): Promise<IPartitionLambdaFactory> {
    const redisConfig = config.get("redis");
    const publisher = new services.SocketIoRedisPublisher(redisConfig.port, redisConfig.host);

    const mongoUrl = config.get("mongo:endpoint") as string;
    const deltasCollectionName = config.get("mongo:collectionNames:deltas");
    const mongoFactory = new services.MongoDbFactory(mongoUrl);
    const mongoManager = new utils.MongoManager(mongoFactory, false);

    const db = await mongoManager.getDatabase();
    const opCollection = db.collection(deltasCollectionName);
    await opCollection.createIndex(
        {
            "documentId": 1,
            "operation.sequenceNumber": 1,
            "tenantId": 1,
        },
        true);

    const contentCollection = db.collection("content");
    await contentCollection.createIndex(
        {
            "clientId": 1,
            "documentId": 1,
            "op.clientSequenceNumber": 1,
            "tenantId": 1,
        },
        true);

    return new ScriptoriumLambdaFactory(mongoManager, opCollection, contentCollection, publisher);
}
