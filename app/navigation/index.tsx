import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import React from 'react'
import LinkingConfiguration from './LinkingConfiguration'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerNavigatorParams } from '../types/navigation'
import { useRecoilValue } from 'recoil'
import { isDarkState, loginState } from '../recoil/selectors'
import DrawerMenu from '../components/DrawerMenu'
import { StatusBar } from 'expo-status-bar'
import AuthNavigator from './Auth/AuthNavigator'
import theme from '../theme'
import { ThemeProvider } from 'styled-components/native'
import { socket, SocketContext } from '../hooks/socket'
import RootNavigator from './RootNavigator'

const Drawer = createDrawerNavigator<DrawerNavigatorParams>()

export default function Navigation() {
    const lightTheme = {
        ...DefaultTheme,
        colors: theme.light,
    }
    const darkTheme = {
        ...DarkTheme,
        colors: theme.dark,
    }
    const isLoggedIn = useRecoilValue(loginState)
    const isDark = useRecoilValue(isDarkState)

    return (
        <SocketContext.Provider value={socket}>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <NavigationContainer
                    linking={LinkingConfiguration}
                    theme={isDark ? darkTheme : lightTheme}>
                    {isLoggedIn ? (
                        <Drawer.Navigator
                            screenOptions={{
                                headerShown: false,
                                drawerPosition: 'right',
                                drawerStyle: {
                                    backgroundColor: 'transparent',
                                },
                            }}
                            drawerContent={props => <DrawerMenu {...props} />}
                        >
                            <Drawer.Screen name="RootNavigator" component={RootNavigator} />
                        </Drawer.Navigator>
                    ) : (
                        <AuthNavigator />
                    )}
                    <StatusBar style="light" />
                </NavigationContainer>
            </ThemeProvider>
        </SocketContext.Provider>
    )
}