import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'
import { ApolloProvider } from '@apollo/client'
import {
    RecoilRoot,
} from 'recoil'
import client from './config/client'
import { Text } from './components/Themed'
import React from 'react'
import  {  RootSiblingParent  }  from  'react-native-root-siblings'

export default function App() {
    const isLoadingComplete = useCachedResources()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <ApolloProvider client={client}>
                <SafeAreaProvider>
                    <RecoilRoot>
                        <RootSiblingParent>
                            <React.Suspense fallback={<Text>Loading</Text>}>
                                <Navigation/>
                                <StatusBar />
                            </React.Suspense>
                        </RootSiblingParent>
                    </RecoilRoot>
                </SafeAreaProvider>
            </ApolloProvider>
        )
    }
}
