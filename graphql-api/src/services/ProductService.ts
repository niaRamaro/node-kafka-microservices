import { Service } from 'typedi'

import KafkaProducerService from './KafkaProducerService'
import ListArgs from '../graphql/types/ListArgs'
import MongoService, { PRODUCT_MONGO_COLLECTION } from './MongoService'
import Product from '../graphql/types/Product'
import ProductList from '../graphql/types/ProductList'
import { TOPICS } from '../server'

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

    async findAll({ skip, take }: ListArgs): Promise<ProductList> {
        const collection = MongoService.database.collection(
            PRODUCT_MONGO_COLLECTION
        )

        const count = await collection.countDocuments()

        return {
            count,
            hasMore: skip + take < count,
            items: await collection.find().skip(skip).limit(take).toArray()
        }
    }
}
