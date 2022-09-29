import { createServer } from '@graphql-yoga/node'
import { typeDefs } from './typeDefs'
import rootResolvers from './resolvers'

const server = createServer({
  schema: {
    typeDefs,
    resolvers: rootResolvers,
  },
  endpoint: '/api/graphql',
  // graphiql: false // uncomment to disable GraphiQL
})

export default server
