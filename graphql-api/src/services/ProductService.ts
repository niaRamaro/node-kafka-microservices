import { Service } from 'typedi'

import Product from '../graphql/types/Product'
import ProductInput from '../graphql/types/ProductInput'

const products = [...Array(5).keys()].map((_, index) => ({
    id: `${index}`,
    name: `Name ${index}`,
    description: `Description ${index}`,
    price: 5
})) as Product[]

@Service()
export class ProductService {
    constructor() {}

    async addNew(newProduct: ProductInput): Promise<Product> {
        return await new Promise((resolve) => {
            const product = new Product(newProduct)
            product.id = `${products.length}`
            products.push(product)

            setTimeout(() => resolve(product), 2000)
        })
    }

    findAll(): Product[] {
        return products
    }
}
