import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export default class Product {
    constructor({ name, price, description }: any) {
        this.name = name
        this.price = price
        this.description = description
    }

    @Field((type) => ID)
    id!: string
    @Field()
    name: string
    @Field()
    price: number
    @Field()
    description: string
}
