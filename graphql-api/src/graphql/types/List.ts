import { ClassType, Field, Int, ObjectType } from 'type-graphql'

export default function List<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType({ isAbstract: true })
    abstract class ListClass {
        @Field((type) => Int)
        count!: number

        @Field()
        hasMore!: boolean

        @Field((type) => [TItemClass])
        items!: TItem[]
    }

    return ListClass
}
