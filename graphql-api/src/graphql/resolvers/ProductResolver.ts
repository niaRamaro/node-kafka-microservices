import { Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'

import Product from '../types/Product'
import { ProductService } from '../../services/ProductService'

@Service()
@Resolver(Product)
export default class ProductResolver {
    constructor(private productService: ProductService) {}

    @Query((returns) => [Product])
    products() {
        return this.productService.findAll()
    }
}
