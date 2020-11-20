import { Producer } from 'node-rdkafka'

import { TOPICS } from '../server'

export default class KafkaProducerService {
    private static producer: Producer
    private static acknowledgementCallbacks = new Map<string, () => void>()

    static setProducer(producer: Producer) {
        this.producer = producer

        this.producer.on('delivery-report', (err, { key }) => {
            if (!err && key) {
                const formatedKey = key.toString()
                const callback = this.acknowledgementCallbacks.get(formatedKey)
                if (callback) {
                    this.acknowledgementCallbacks.delete(formatedKey)
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
                reject(new Error(`Message with key ${key} could not be sent`))
                return
            }

            if (waitForAcknowledgment) {
                this.acknowledgementCallbacks.set(key, resolve)

                setTimeout(
                    () =>
                        reject(
                            new Error(
                                `Message acknowledgement for ${key} took too long`
                            )
                        ),
                    20 * 1000
                )
            } else {
                resolve()
            }
        })
    }
}
