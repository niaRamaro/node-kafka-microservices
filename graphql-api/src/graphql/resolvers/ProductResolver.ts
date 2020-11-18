import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'

import Product from '../types/Product'
import ProductInput from '../types/ProductInput'
import { ProductService } from '../../services/ProductService'

@Service()
@Resolver(Product)
export default class ProductResolver {
    constructor(private productService: ProductService) {}

    @Query((returns) => [Product])
    products() {
        return this.productService.findAll()
    }

    @Mutation((returns) => Product)
    async addProduct(
        @Arg('newProduct') newProduct: ProductInput
    ): Promise<Product> {
        return await this.productService.addNew(newProduct)
    }
}
