import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ProfileNavigatorParams } from '../../types/navigation'
import { useTheme } from '@react-navigation/native'
import { Main } from '../../screens/Profile'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

const Stack = createStackNavigator<ProfileNavigatorParams>()

const ProfileNavigator: React.FC = () => {
    const theme = useTheme()
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerTransparent: false,
                headerTitle: '',
                headerStyle: {
                    shadowColor: 'transparent',
                    backgroundColor: theme.colors.background,
                },
                headerTintColor: theme.colors.text,
                headerRight: () => (
                    <TouchableOpacity
                        style={{ marginHorizontal: 12 }}
                        onPress={() => {
                            navigation.toggleDrawer()
                        }}
                    >
                        <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                ),
            })}
        >
            <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator