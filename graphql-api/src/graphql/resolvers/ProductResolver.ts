import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'

import ListArgs from '../types/ListArgs'
import Product from '../types/Product'
import ProductList from '../types/ProductList'
import { ProductService } from '../../services/ProductService'

@Service()
@Resolver(Product)
export default class ProductResolver {
    constructor(private productService: ProductService) {}

    @Query((returns) => ProductList)
    products(@Args() { skip, take }: ListArgs): Promise<ProductList> {
        return this.productService.findAll({ skip, take })
    }

    @Mutation((returns) => Product)
    async addProduct(@Arg('newProduct') newProduct: Product): Promise<Product> {
        if (await this.productService.addNew(newProduct)) {
            return newProduct
        } else {
            throw new Error('Internal Server Error')
        }
    }
}
