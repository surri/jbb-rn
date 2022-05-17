import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import EditSportsModal from '../screens/EditSportsModal'
import NotFoundScreen from '../screens/NotFoundScreen'
import HotPlace from '../screens/HotPlace'
import MyHotPlace from '../screens/MyHotPlace'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import { View, Text } from '../components/Themed'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerNavigatorParams, RootStackParams } from '../types/navigation'
import { useRecoilValue } from 'recoil'
import {  loginState, userState } from '../recoil/selectors'
import DrawerMenu from '../components/DrawerMenu'
import { StatusBar } from 'expo-status-bar'
import AuthNavigator from './Auth/AuthNavigator'
import BottomTabNavigator from './Tab/BottomTabNavigator'

type IProps = {
    theme: Theme
}
const Drawer = createDrawerNavigator<DrawerNavigatorParams>()
export default function Navigation({ theme }: IProps) {
    const user = useRecoilValue(userState)
    const isLoggedIn = useRecoilValue(loginState)
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={theme}>
            {/* {isLoggedIn ? ( */}
            {!isLoggedIn ? (
                <Drawer.Navigator
                    screenOptions={{
                        headerShown: false,
                        drawerPosition: 'right',
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

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParams>()

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Modal" component={EditSportsModal} options={{ title: '내 카테고리' }}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switc. screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

// function BottomTabNavigator() {
//     const colorScheme = useColorScheme()

//     return (
//         <BottomTab.Navigator
//             initialRouteName="HotPlace"
//             screenOptions={{
//                 tabBarActiveTintColor: Colors[colorScheme].tint,
//                 tabBarStyle: {
//                     backgroundColor: 'transparent',
//                 },
//             }}
//         >
//             <BottomTab.Screen
//                 name="HotPlace"
//                 component={HotPlace}
//                 options={({ navigation }: RootTabScreenProps<'HotPlace'>) => ({
//                     title: '핫플',
//                     tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
//                     headerTitle: () => (
//                         <Pressable
//                             onPress={() => navigation.navigate('Modal')}
//                             style={({ pressed }) => ({
//                                 opacity: pressed ? 0.5 : 1,
//                             })}>
//                             <View style={{ flexDirection: 'row' }}>
//                                 <Text style={{ fontSize: 16, fontWeight: 'bold' }}>문정동</Text>
//                                 <FontAwesome
//                                     name="chevron-down"
//                                     size={16}
//                                     color={Colors[colorScheme].text}
//                                     style={{ marginLeft: 4 }}
//                                 />
//                             </View>
//                         </Pressable>
//                     ),
//                 })}
//             />
//             <BottomTab.Screen
//                 name="MyHotPlace"
//                 component={MyHotPlace}
//                 options={{
//                     title: '나의 핫플',
//                     tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
//                 }}
//             />
//         </BottomTab.Navigator>
//     )
// }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={24} style={{ marginBottom: -4 }} {...props} />
}
