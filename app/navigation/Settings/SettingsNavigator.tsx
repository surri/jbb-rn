import * as React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { SettingsNavigatorParams } from '../../types/navigation'
import HeaderRight from '../../components/Header/HeaderRight'
import { Account } from '../../screens/Settings'
import { RouteProp } from '@react-navigation/native'
import ChangePhoneNumber from '../../screens/Settings/ChangePhoneNumber'
import Withdrawal from '../../screens/Settings/Withdrawal'

const SettingsStack = createStackNavigator<SettingsNavigatorParams>()
type Props = {
    navigation: StackNavigationProp<SettingsNavigatorParams>,
    route: RouteProp<SettingsNavigatorParams>,
}

const SettingsNavigator: React.FC<Props> = ({ navigation, route }: Props) => {
    return (
        <SettingsStack.Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <SettingsStack.Screen name="Account" component={Account} />
            <SettingsStack.Screen name="ChangePhoneNumber" component={ChangePhoneNumber} />
            <SettingsStack.Screen name="Withdrawal" component={Withdrawal} />
        </SettingsStack.Navigator>
    )
}

export default SettingsNavigator