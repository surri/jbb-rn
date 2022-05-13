import { FontAwesome } from '@expo/vector-icons'
import { useFonts, loadAsync }  from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false)

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync()

                // Load fonts
                await loadAsync({
                    ...FontAwesome.font,
                    'notosans': require('../../assets/fonts/NotoSansKR-Regular.otf'),
                    'notosans-medium': require('../../assets/fonts/NotoSansKR-Medium.otf'),
                    'notosans-bold': require('../../assets/fonts/NotoSansKR-Bold.otf'),
                    'notosans-light': require('../../assets/fonts/NotoSansKR-Light.otf'),
                    'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
                })
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e)
            } finally {
                setLoadingComplete(true)
                SplashScreen.hideAsync()
            }
        }

        loadResourcesAndDataAsync()
    }, [])

    return isLoadingComplete
}
