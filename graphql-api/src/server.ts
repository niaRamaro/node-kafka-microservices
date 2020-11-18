import 'reflect-metadata'

import Container from 'typedi'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'

import resolvers from './graphql/resolvers'

async function start() {
    const schema = await buildSchema({
        resolvers,
        container: Container
    })

    const server = new ApolloServer({ schema })
    try {
        const { url } = await server.listen()

        console.log(`Server running on : ${url}`)
    } catch (e) {
        console.log(`Couldn't start the server`, e)
    }
}

start()
