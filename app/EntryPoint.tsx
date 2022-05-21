import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import { ApolloProvider } from '@apollo/client'
import {
    RecoilRoot,
} from 'recoil'
import client from './config/client'

export default function App() {
    const isLoadingComplete = useCachedResources()
    // const colorScheme = useColorScheme()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <ApolloProvider client={client}>
                <SafeAreaProvider>
                    <RecoilRoot>
                        <Navigation/>
                        <StatusBar />
                    </RecoilRoot>
                </SafeAreaProvider>
            </ApolloProvider>
        )
    }
}
