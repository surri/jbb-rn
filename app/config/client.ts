import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
// const uri = 'https://api.jangbibbal.com/graphql'
const uri = 'http://localhost:3004/graphql'

const uploadLink = (createUploadLink({
    uri,
}) as unknown) as ApolloLink

const requestLink = createHttpLink({
    uri,
})

const authLink = setContext((_, { headers }) => {
    const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJldW5nIiwiZGlzcGxheU5hbWUiOiJFdW5nIiwicGhvbmUiOiIwMTA5MDk2NDA0MiIsImVtYWlsIjoiRXVuZ0Bob3RwbGVyLmNvbSIsImlhdCI6MTY1MjkyNDg2MiwiZXhwIjoxNjUzMDExMjYyfQ.utqtDLDHXJk18dZ76zec-J4qcx1M5lHzbNfyVm-HqrY'
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