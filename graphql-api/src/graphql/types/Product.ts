import { IsUUID } from 'class-validator'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@InputType('ProductInput')
@ObjectType()
export default class Product {
    @Field((type) => ID)
    @IsUUID()
    uuid!: string
    @Field()
    name!: string
    @Field()
    price!: number
    @Field()
    description!: string
}
