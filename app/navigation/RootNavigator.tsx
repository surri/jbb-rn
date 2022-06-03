import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParams } from '../types/navigation'
import { useTheme } from '@react-navigation/native'
import BottomTabNavigator from './Tab/BottomTabNavigator'
import NotFoundScreen from '../screens/NotFoundScreen'
import { Show as Chat } from '../screens/Messages'
import EditSportsModal from '../screens/EditSportsModal'
import ReportsNavigator from './Reports/ReportsNavigator'
import { UserProfile } from '../screens/Profile'
import SettingsNavigator from './Settings/SettingsNavigator'

const Stack = createStackNavigator<RootStackParams>()

export default function RootNavigator() {
    const theme = useTheme()
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: theme.colors.background,
                },
                headerShadowVisible: false,
                gestureResponseDistance: 400,
            })}
        >
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Screen name="Chat" component={Chat}/>
            <Stack.Screen name="UserProfile" component={UserProfile} options={{ title: '프로필' }} />
            <Stack.Screen name="SettingsNavigator" component={SettingsNavigator} options={{ title: '설정' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="ReportsNavigator"
                    component={ReportsNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                    name="Modal"
                    component={EditSportsModal}
                    options={{
                        headerTitle: '',
                        headerTransparent: false,
                        headerStyle: {
                            backgroundColor: theme.colors.background,
                        },
                    }}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}