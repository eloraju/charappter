import { MongoClient } from 'mongodb';

export async function getTestDB(): Promise<MongoClient> {
    return await MongoClient.connect(process.env.MONGO_URL);
}
