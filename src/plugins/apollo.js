import { setContext } from '@apollo/client/link/context'
import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache
} from '@apollo/client/core'
const appToken = localStorage.getItem(import.meta.env.VITE_KEY_APP_TOKEN)

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: [appToken ? `Bearer ${appToken}` : '']
    }
  }
})
const appLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: appToken ? `Bearer ${appToken}` : ''
    }
  }
})
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_GRAPHQL_URL
})

// Cache implementation
const cache = new InMemoryCache()
// Create the apollo client
const apolloClient = new ApolloClient({
  link: from([authLink, appLink, httpLink]),
  cache
})

export default apolloClient
