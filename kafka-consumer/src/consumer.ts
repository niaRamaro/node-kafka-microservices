import { KafkaConsumer } from 'node-rdkafka'
import { MongoClient } from 'mongodb'

import MongoService from './services/MongoService'
import { TOPICS, TOPIC_HANDLERS } from './constants/topic'

const kafkaHost = process.env.KAFKA_HOST || 'localhost'
const kafkaPort = process.env.KAFKA_PORT || '9092'

const mongoHost = process.env.MONGO_HOST || 'localhost:27017'
const mongoDbName = process.env.MONGO_DB_NAME || 'node-kafka-microservices'

async function start() {
    try {
        const client = new MongoClient(`mongodb://${mongoHost}`, {
            useUnifiedTopology: true
        })
        await client.connect()
        MongoService.database = client.db(mongoDbName)

        const consumer = new KafkaConsumer(
            {
                'group.id': 'node-kafka-microservices',
                'metadata.broker.list': `${kafkaHost}:${kafkaPort}`
            },
            {}
        )

        consumer.connect()

        consumer
            .on('ready', () => {
                console.log('Consumer is listening for messages')
                consumer.subscribe(Object.values(TOPICS))
                consumer.consume()
            })
            .on('data', ({ topic, value }) => {
                const formatedMessage = value
                    ? JSON.parse(value?.toString())
                    : null
                const formatedTopic = topic?.toString() as TOPICS
                if (
                    formatedTopic &&
                    formatedTopic &&
                    Object.values(TOPICS).includes(formatedTopic)
                ) {
                    const handler = TOPIC_HANDLERS[formatedTopic]
                    if (handler) {
                        handler(formatedMessage)
                    }
                }
            })
    } catch (e) {
        console.log(e)
    }
}

start()
