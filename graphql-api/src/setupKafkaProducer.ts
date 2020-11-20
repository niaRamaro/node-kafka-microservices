import { Producer } from 'node-rdkafka'

const kafkaHost = process.env.KAFKA_HOST || 'localhost'
const kafkaPort = process.env.KAFKA_PORT || '9092'

export default function setupKafkaProducer(): Promise<Producer> {
    return new Promise(async (resolve, reject) => {
        const producer = new Producer({
            'metadata.broker.list': `${kafkaHost}:${kafkaPort}`,
            'dr_cb': true
        })

        producer.on('ready', () => resolve(producer))

        producer.on('event.error', function (err) {
            console.error('Error from producer')
            reject(err)
        })

        producer.setPollInterval(100)

        producer.connect({}, (err) => {
            if (err) {
                reject(err)
                return
            }
        })
    })
}
