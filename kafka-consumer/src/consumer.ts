import { KafkaConsumer } from 'node-rdkafka'

const kafkaHost = process.env.KAFKA_HOST || 'localhost'
const kafkaPort = process.env.KAFKA_PORT || '9092'

export enum TOPICS {
    PRODUCTS_TO_ADD_TOPIC = 'products-to-add'
}

async function start() {
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
            const formatedValue = value?.toString()
            const formatedTopic = topic?.toString() as TOPICS
            if (
                formatedTopic &&
                formatedTopic &&
                Object.values(TOPICS).includes(formatedTopic)
            ) {
                console.log('Received ', formatedTopic, formatedValue)
            }
        })
}

start()
