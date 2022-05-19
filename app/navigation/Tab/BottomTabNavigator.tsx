import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabNavigatorParams } from '../../types/navigation'

import SettingsNavigator from '../Settings/SettingsNavigator'

import styled from 'styled-components/native'
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons'
import TextStyles from '../../components/styled/TextStyles'
import { useTheme } from '@react-navigation/native'
import SearchNavigator from '../Search/SearchNavigator'
import CreateNavigator from '../Create/CreateNavigator'
import ProfileNavigator from '../Profile/ProfileNavigator'
import MessagesNavigator from '../Messages/MessagesNavigator'

const Tab = createBottomTabNavigator<TabNavigatorParams>()

type TabBarLabel = {
    color?: string;
}

const TabBarLabel = styled(TextStyles.Regular)`
    color: ${(props: TabBarLabel) => props.color || '#000'};
`

const BottomTabNavigator: React.FC = () => {

    const theme = useTheme()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    borderTopColor: theme.colors.primary,
                    backgroundColor: theme.colors.background,
                    paddingTop: 4,
                },
                tabBarIcon: ({ color }) => {
                    if (route.name === 'Search'){
                        return <Entypo name="magnifying-glass" size={24} color={color} />
                    } else if (route.name === 'Create') {
                        return <AntDesign name="pluscircleo" size={24} color={color} />
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
            <Tab.Screen
                name="Create"
                component={CreateNavigator}
                options={{ tabBarLabel: '' }}
            />
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