import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

const uploadLink = (createUploadLink({
    uri: 'http://localhost:3004/graphql',
}) as unknown) as ApolloLink

const requestLink = createHttpLink({
    uri: 'http://localhost:3004/graphql',
})

const authLink = setContext((_, { headers }) => {
    const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJldW5nIiwiZGlzcGxheU5hbWUiOiJFdW5nIiwiZW1haWwiOiJFdW5nQGhvdHBsZXIuY29tIiwiaWF0IjoxNjUyODQ4MjY3LCJleHAiOjE2NTI5MzQ2Njd9.kISfhmxcLjlPQxp5rPDQWPvj7v0YVTEAeqJVASVrob4'
    // get the authentication token from local storage if it exists
    const token = tempToken //localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})
export default new ApolloClient({
    link: ApolloLink.from([authLink, requestLink, uploadLink]),
    cache: new InMemoryCache(),
    defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
    connectToDevTools: true,
})