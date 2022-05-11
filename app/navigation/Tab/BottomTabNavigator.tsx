import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TabNavigatorParams } from '../../types/navigation'

import SettingsNavigator from '../Settings/SettingsNavigator'

import styled from 'styled-components/native'
import { Entypo, Feather } from '@expo/vector-icons'
import TextStyles from '../../components/styled/TextStyles'
import { useTheme } from '@react-navigation/native'
import SearchNavigator from '../Search/SearchNavigator'

const Tab = createBottomTabNavigator<TabNavigatorParams>()

type TabBarLabel = {
    color?: string;
}

const TabBarLabel = styled(TextStyles.R2014)`
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
                },
                tabBarIcon: ({ color }) => {
                    // if (route.name === 'Home') {
                    //     return  <Feather size={24} name="home" color={color} />
                    // } else
                    if (route.name === 'Search'){
                        return <Entypo name="magnifying-glass" size={24} color={color} />
                    } else if (route.name === 'Settings'){
                        return  <Feather name="settings" size={24} color={color}/>
                    }
                },
            })}
        >
            {/* <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarLabel: () => <TabBarLabel color={theme.colors.text}>홈</TabBarLabel>,
                }}
            /> */}
            <Tab.Screen
                name="Search"
                component={SearchNavigator}
                options={{
                    tabBarLabel: () => <TabBarLabel color={theme.colors.text}>찾아보기</TabBarLabel>,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                    tabBarLabel: () => <TabBarLabel color={theme.colors.text}>설정</TabBarLabel>,
                    tabBarBadge: 3,
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator