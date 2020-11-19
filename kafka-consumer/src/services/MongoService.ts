import { Db } from 'mongodb'

export default class MongoService {
    static database: Db

    static insertOne<T>(collection: string, data: T) {
        this.database.collection(collection).insertOne(data)
    }
}
