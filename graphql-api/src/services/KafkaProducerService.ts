import { Producer } from 'node-rdkafka'

import { TOPICS } from '../server'

export default class KafkaProducerService {
    private static producer: Producer
    private static acknowledgmentsMap = new Map<string, () => void>()

    static setProducer(producer: Producer) {
        this.producer = producer

        this.producer.on('delivery-report', (err, { key }) => {
            if (!err && key) {
                const formatedKey = key.toString()
                const callback = this.acknowledgmentsMap.get(formatedKey)
                if (callback) {
                    this.acknowledgmentsMap.delete(formatedKey)
                    callback()
                }
            }
        })
    }

    static async produce(
        topic: TOPICS,
        message: any,
        key: string,
        waitForAcknowledgment = true
    ): Promise<null> {
        return new Promise((resolve, reject) => {
            if (!this.producer.isConnected()) {
                reject(new Error('Producer is not connected'))
                return
            }

            const isMessageSent = this.producer.produce(
                topic,
                null,
                Buffer.from(JSON.stringify(message)),
                key
            )

            if (!isMessageSent) {
                reject()
                return
            }

            if (waitForAcknowledgment) {
                this.acknowledgmentsMap.set(key, resolve)

                setTimeout(
                    () =>
                        reject(
                            new Error(
                                'Kafka message acknowledgement took too long'
                            )
                        ),
                    10 * 1000
                )
            } else {
                resolve()
            }
        })
    }
}
