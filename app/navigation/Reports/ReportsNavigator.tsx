import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ReportsNavigatorParams } from '../../types/navigation'
import { Categories, ReportPost } from '../../screens/Reports'
import { RouteProp } from '@react-navigation/native'
import { useTheme } from '@react-navigation/native'


type Props = {
    route: RouteProp<ReportsNavigatorParams>,
}

const Stack = createStackNavigator<ReportsNavigatorParams>()

const ReportsNavigator: React.FC<Props> = ({ route }: Props) => {
    const theme = useTheme()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerTitle: '신고하기',
                headerStyle: {
                    shadowColor: 'transparent',
                    backgroundColor: theme.colors.background,
                },
                headerTintColor: theme.colors.text,
            }}
        >
            <Stack.Screen name="Categories" component={Categories} initialParams={route.params} />
            <Stack.Screen name="ReportPost" component={ReportPost} initialParams={route.params} />
        </Stack.Navigator>
    )
}

export default ReportsNavigator