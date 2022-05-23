import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import AsyncStorage from '@react-native-async-storage/async-storage'
// const uri = 'https://api.jangbibbal.com/graphql'
const uri = 'http://localhost:3004/graphql'

const uploadLink = (createUploadLink({
    uri,
}) as unknown) as ApolloLink

const requestLink = createHttpLink({
    uri,
})

const authLink = setContext(async (_, { headers }) => {
    const user = await AsyncStorage.getItem('user')
    const token = !!user && JSON.parse(user)?.accessToken || null
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