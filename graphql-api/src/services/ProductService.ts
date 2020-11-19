import { Service } from 'typedi'

import KafkaProducerService from './KafkaProducerService'
import Product from '../graphql/types/Product'
import { TOPICS } from '../server'
import MongoService, { PRODUCT_MONGO_COLLECTION } from './MongoService'

@Service()
export class ProductService {
    constructor() {}

    async addNew(newProduct: Product): Promise<boolean> {
        try {
            await KafkaProducerService.produce(
                TOPICS.PRODUCTS_TO_ADD_TOPIC,
                newProduct,
                newProduct.uuid
            )

            return true
        } catch (e) {
            return false
        }
    }

    async findAll(): Promise<Product[]> {
        return await MongoService.database
            .collection(PRODUCT_MONGO_COLLECTION)
            .find()
            .toArray()
    }
}
