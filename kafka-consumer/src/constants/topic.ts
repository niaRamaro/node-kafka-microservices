import MongoService from '../services/MongoService'
import { Product } from '../types/Product'

export enum TOPICS {
    PRODUCTS_TO_ADD_TOPIC = 'products-to-add'
}

export const TOPIC_HANDLERS = {
    [TOPICS.PRODUCTS_TO_ADD_TOPIC]: (product: Product) =>
        MongoService.insertOne<Product>('product', product)
}
