import { Field, ID, InputType, ObjectType } from 'type-graphql'

@InputType('ProductInput')
@ObjectType()
export default class Product {
    @Field((type) => ID)
    uuid!: string
    @Field()
    name!: string
    @Field()
    price!: number
    @Field()
    description!: string
}
