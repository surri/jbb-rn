import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ProfileNavigatorParams } from '../../types/navigation'
import { Main } from '../../screens/Profile'

const Stack = createStackNavigator<ProfileNavigatorParams>()

const ProfileNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerTransparent: true,
                headerTitle: '',
            })}
        >
            <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator