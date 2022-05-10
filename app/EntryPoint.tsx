import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
    RecoilRoot,
} from 'recoil'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import theme from './theme'

export default function App() {

    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()

    const lightTheme = {
        ...DefaultTheme,
        colors: theme.light,
    }
    const darkTheme = {
        ...DarkTheme,
        colors: theme.dark,
    }
    const httpLink = createHttpLink({
        uri: 'https://api.jangbibbal.com/graphql',
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
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    })
    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <ApolloProvider client={client}>
                <SafeAreaProvider>
                    <RecoilRoot>
                        <Navigation theme={colorScheme === 'dark' ? darkTheme : lightTheme}></Navigation>
                        {/* <Navigation theme={lightTheme} /> */}
                        {/* <Navigation theme={darkTheme} /> */}
                        <StatusBar />
                    </RecoilRoot>
                </SafeAreaProvider>
            </ApolloProvider>
        )
    }
}
