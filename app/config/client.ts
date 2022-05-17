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
    const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV1bmciLCJkaXNwbGF5X25hbWUiOiJldW5nIiwiZW1haWwiOiJldW5nQGV1bmcuY29tIiwiaWF0IjoxNjQxMjE5NjE5LCJleHAiOjE2NDEzMDYwMTl9.3r_He6DOOPDdrweaxUW3nsKlHeq-L9IlkVk2t9Vtse8'
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