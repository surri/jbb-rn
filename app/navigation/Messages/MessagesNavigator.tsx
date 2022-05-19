import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MessagesNavigatorParams } from '../../types/navigation'
import HeaderRight from '../../components/Header/HeaderRight'
import Main from '../../screens/Settings'

const Stack = createStackNavigator<MessagesNavigatorParams>()

const MessagesNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerTransparent: false,
                headerTitle: '',
                headerRight: () => <HeaderRight inversion={false} />,
            })}
        >
            <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    )
}

export default MessagesNavigator