import { MongoClient } from 'mongodb'

import MongoService from './services/MongoService'
import setupConsumer from './setupConsumer'

const mongoHost = process.env.MONGO_HOST || 'localhost:27017'
const mongoDbName = process.env.MONGO_DB_NAME || 'node-kafka-microservices'

async function start() {
    try {
        const client = new MongoClient(`mongodb://${mongoHost}`, {
            useUnifiedTopology: true
        })
        await client.connect()
        MongoService.database = client.db(mongoDbName)

        setupConsumer()
    } catch (e) {
        console.log(e)
    }
}

start()
