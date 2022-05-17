import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native'
import { CreateNavigatorParams } from '../../types/navigation'
import Create from '../../screens/Posts/Create'
import { Category } from '../../screens/Posts'

const Stack = createStackNavigator<CreateNavigatorParams>()

const CreateNavigator: React.FC = () => {
    const theme = useTheme()
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    shadowColor: 'transparent',
                    backgroundColor: theme.colors.background,
                },
            })}
            initialRouteName="Create"
        >
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen
                name="Create"
                component={Create}
                options={() => ({
                    headerTitle: '글쓰기',
                })}
            />
        </Stack.Navigator>
    )
}

export default CreateNavigator