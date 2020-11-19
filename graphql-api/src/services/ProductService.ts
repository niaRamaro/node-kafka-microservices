import { Service } from 'typedi'

import KafkaProducerService from './KafkaProducerService'
import Product from '../graphql/types/Product'
import { TOPICS } from '../server'

const products = [...Array(5).keys()].map((_, index) => ({
    uuid: `${index}`,
    name: `Name ${index}`,
    description: `Description ${index}`,
    price: 5
})) as Product[]

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

    findAll(): Product[] {
        return products
    }
}
