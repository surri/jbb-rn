import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthNavigatorParams } from '../../types/navigation'
// import { useSelector } from 'react-redux'
import { Main, Signup } from '../../screens/Auth'
import { useTheme } from '@react-navigation/native'
import AuthExistingUser from '../../screens/Auth/AuthExistingUser'
// import ForgotPassword from '../screens/ForgotPassword'
// import { IAuth } from '../store/Auth'

// interface IState {
//     authReducer: IAuth;
// }

const AuthStack = createStackNavigator<AuthNavigatorParams>()

const AuthNavigator: React.FC = () => {
    const theme = useTheme()
    return (
        <AuthStack.Navigator
            screenOptions={() => ({
                headerTransparent: false,
                headerTitle: '',
                headerStyle: {
                    shadowColor: 'transparent',
                    backgroundColor: theme.colors.background,
                },
                headerTintColor: theme.colors.text,
            })}
        >
            <AuthStack.Screen
                name="Main"
                component={Main}
            />
            <AuthStack.Screen
                name="Signup"
                component={Signup}
            />
            <AuthStack.Screen
                name="AuthExistingUser"
                component={AuthExistingUser}
            />
        </AuthStack.Navigator>
    )
}

export default AuthNavigator