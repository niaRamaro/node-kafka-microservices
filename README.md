# node-kafka-microservices
This is a **Kafka** messaging example using two Node.js servers :
1. A GraphQL API
    - Has a **addProduct** Mutation which will be just sent to the second server through Kafka. It sends back the response to the client only once the message has been acknowledged by a consumer
    - Has a basic **products** Query that will list all the products inside a shared MongoDB database.
2. A simple Kafka Consumer
    - Receives a message, containing a new **Product** to save, from the first server and inserts it in the shared MongoDB database

For the sake of simplicity, both servers are stored as [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) in a monorepo.

## Usage

Install dependencies

```sh
yarn
```

Start both servers in development

```sh
yarn dev
```

Compile and start both servers

```sh
yarn start
```

Open **package.json** for more script options
