import { Service } from 'typedi'

import Product from '../graphql/types/Product'

@Service()
export class ProductService {
    constructor() {}

    findAll(): Product[] {
        return [...Array(5).keys()].map((_, index) => ({
            id: `${index}`,
            name: `Name ${index}`,
            description: `Description ${index}`,
            price: 5
        })) as Product[]
    }
}
