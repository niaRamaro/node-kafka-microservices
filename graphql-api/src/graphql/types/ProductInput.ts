import { Field, InputType } from 'type-graphql'

import Product from './Product'

@InputType({ description: 'New product data' })
export default class ProductInput implements Partial<Product> {
    @Field()
    name!: string

    @Field()
    description!: string

    @Field()
    price!: number
}
