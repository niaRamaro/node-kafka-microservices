import 'reflect-metadata'

import Container from 'typedi'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'

import KafkaProducerService from './services/KafkaProducerService'
import resolvers from './graphql/resolvers'
import setupKafkaProducer from './setupKafkaProducer'
import MongoService from './services/MongoService'
import setupMongo from './setupMongo'

export enum TOPICS {
    PRODUCTS_TO_ADD_TOPIC = 'products-to-add'
}

const port = process.env.PORT || 4000

async function start() {
    try {
        KafkaProducerService.setProducer(await setupKafkaProducer())
        MongoService.database = await setupMongo()

        const schema = await buildSchema({
            resolvers,
            container: Container
        })

        const server = new ApolloServer({ schema })
        const { url } = await server.listen({
            port
        })

        console.log(`Server running on : ${url}`)
    } catch (e) {
        console.log(`Couldn't start the server`, e)
    }
}

start()
