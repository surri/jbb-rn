import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabNavigatorParams } from '../../types/navigation'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import SearchNavigator from '../Search/SearchNavigator'
import ProfileNavigator from '../Profile/ProfileNavigator'
import MessagesNavigator from '../Messages/MessagesNavigator'
import { Platform } from 'react-native'

const Tab = createBottomTabNavigator<TabNavigatorParams>()

const BottomTabNavigator: React.FC = () => {

    const theme = useTheme()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    borderTopColor: theme.colors.placeHolder,
                    backgroundColor: Platform.select({ ios: 'transparent', android: theme.colors.background }),
                    paddingTop: 8,
                },
                tabBarActiveTintColor: theme.colors.active,
                tabBarInactiveTintColor: theme.colors.placeHolder,
                tabBarIcon: ({ color }) => {
                    if (route.name === 'Search'){
                        return <Entypo name="magnifying-glass" size={24} color={color} />
                    // } else if (route.name === 'Create') {
                    //     return <AntDesign name="pluscircleo" size={24} color={color} />
                    } else if (route.name === 'Messages') {
                        return <Entypo name="chat" size={24} color={color} />
                    } else if (route.name === 'Profile'){
                        return <FontAwesome name="user-circle-o" size={24} color={color} />
                    }
                },
            })}
        >
            <Tab.Screen
                name="Search"
                component={SearchNavigator}
                options={{ tabBarLabel: '' }}
            />
            {/* <Tab.Screen
                name="Create"
                component={CreateNavigator}
                options={{ tabBarLabel: '' }}
            /> */}
            <Tab.Screen
                name="Messages"
                component={MessagesNavigator}
                options={{
                    tabBarLabel: '',
                    tabBarBadge: 3,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{ tabBarLabel: '' }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator