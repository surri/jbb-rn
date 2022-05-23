import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import EditSportsModal from '../screens/EditSportsModal'
import NotFoundScreen from '../screens/NotFoundScreen'
import { RootTabParamList } from '../types'
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
    )
}

const Stack = createNativeStackNavigator<RootStackParams>()

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="Modal"
                    component={EditSportsModal}
                    options={{
                        headerTitle: '',
                        headerTransparent: true,
                    }}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}