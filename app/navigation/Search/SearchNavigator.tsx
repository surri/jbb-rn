import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SearchNavigatorParams } from '../../types/navigation'
import HeaderRight from '../../components/Header/HeaderRight'
import { Main } from '../../screens/Search'

const SettingsStack = createStackNavigator<SearchNavigatorParams>()

const SearchNavigator: React.FC = () => {
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

export default SearchNavigator