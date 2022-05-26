import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native'
import * as React from 'react'

import EditSportsModal from '../screens/EditSportsModal'
import NotFoundScreen from '../screens/NotFoundScreen'
import LinkingConfiguration from './LinkingConfiguration'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerNavigatorParams, RootStackParams } from '../types/navigation'
import { useRecoilValue } from 'recoil'
import { isDarkState, loginState } from '../recoil/selectors'
import DrawerMenu from '../components/DrawerMenu'
import { StatusBar } from 'expo-status-bar'
import AuthNavigator from './Auth/AuthNavigator'
import BottomTabNavigator from './Tab/BottomTabNavigator'
import theme from '../theme'
import { Show as Chat } from '../screens/Messages'
import { ThemeProvider } from 'styled-components/native'
import { createStackNavigator } from '@react-navigation/stack'

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
    )
}

const Stack = createStackNavigator<RootStackParams>()

function RootNavigator() {
    const theme = useTheme()
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: theme.colors.background,
                },
                headerShadowVisible: false,
                gestureResponseDistance: 400,
            })}
        >
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Screen name="Chat" component={Chat}/>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="Modal"
                    component={EditSportsModal}
                    options={{
                        headerTitle: '',
                        headerTransparent: false,
                        headerStyle: {
                            backgroundColor: theme.colors.background,
                        },
                    }}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}