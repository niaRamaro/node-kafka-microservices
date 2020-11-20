import { ObjectType } from 'type-graphql'

import List from './List'
import Product from './Product'

@ObjectType()
export default class ProductList extends List(Product) {}
