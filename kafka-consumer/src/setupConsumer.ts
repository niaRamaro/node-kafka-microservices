import { KafkaConsumer } from 'node-rdkafka'

import { TOPICS, TOPIC_HANDLERS } from './constants/topic'

const kafkaHost = process.env.KAFKA_HOST || 'localhost'
const kafkaPort = process.env.KAFKA_PORT || '9092'

export default function setupConsumer() {
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
            const formatedMessage = value ? JSON.parse(value?.toString()) : null
            const formatedTopic = topic?.toString() as TOPICS
            if (
                formatedTopic &&
                formatedMessage &&
                Object.values(TOPICS).includes(formatedTopic)
            ) {
                const handler = TOPIC_HANDLERS[formatedTopic]
                if (handler) {
                    handler(formatedMessage)
                }
            }
        })
}
