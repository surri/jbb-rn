import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MessagesNavigatorParams } from '../../types/navigation'
import { List } from '../../screens/Messages'
import { useTheme } from '@react-navigation/native'

const Stack = createStackNavigator<MessagesNavigatorParams>()

const MessagesNavigator: React.FC = () => {
    const theme = useTheme()

    return (
        <Stack.Navigator>
            <Stack.Screen name="List" component={List}
                options={({ navigation, route }: any) => ({
                    headerTransparent: false,
                    headerTitle: '채팅',
                    headerStyle: {
                        shadowColor: 'transparent',
                        backgroundColor: theme.colors.background,
                    },
                    headerTintColor: theme.colors.text,
                })}
            />
        </Stack.Navigator>
    )
}

export default MessagesNavigator