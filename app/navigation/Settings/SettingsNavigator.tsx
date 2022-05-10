import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SettingsNavigatorParams } from '../../types/navigation'
import HeaderRight from '../../components/Header/HeaderRight'
import Main from '../../screens/Settings'

const SettingsStack = createStackNavigator<SettingsNavigatorParams>()

const SettingsNavigator: React.FC = () => {
    return (
        <SettingsStack.Navigator
            screenOptions={() => ({
                headerTransparent: false,
                headerTitle: '',
                headerRight: () => <HeaderRight inversion={false} />,
            })}
        >
            <SettingsStack.Screen name="Main" component={Main} />
        </SettingsStack.Navigator>
    )
}

export default SettingsNavigator