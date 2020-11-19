import { Db } from 'mongodb'

export const PRODUCT_MONGO_COLLECTION =
    process.env.PRODUCT_MONGO_COLLECTION || 'product'

export default class MongoService {
    static database: Db

    static insertOne<T>(collection: string, data: T) {
        this.database.collection(collection).insertOne(data)
    }
}
