import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native'
import { SearchNavigatorParams } from '../../types/navigation'
import { Main, Show } from '../../screens/Search'
import { Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Text, View } from '../../components/Themed'

const SettingsStack = createStackNavigator<SearchNavigatorParams>()

const SearchNavigator: React.FC = () => {
    const theme = useTheme()

    const HeaderTitle = ({ navigation, isShowHeader }: any) => {
        return (
            <Pressable
                onPress={() => navigation.navigate('Modal')}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}>
                <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: isShowHeader || isShowHeader == undefined ? theme.colors.text : theme.colors.background,
                    }} >
                        골프
                    </Text>
                    <FontAwesome
                        name="chevron-down"
                        size={16}
                        color={isShowHeader || isShowHeader == undefined ? theme.colors.text : theme.colors.background}
                        style={{ marginLeft: 4 }}
                    />
                </View>
            </Pressable>
        )
    }

    return (
        <SettingsStack.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    shadowColor: 'transparent',
                    backgroundColor: theme.colors.background,
                },
                headerTitle: () => <HeaderTitle navigation={navigation} />,
            })}
        >
            <SettingsStack.Screen name="Main" component={Main} />
            <SettingsStack.Screen
                name="Show"
                component={Show}
                options={({ navigation, route }: any) => {
                    const isShowHeader = route?.params?.scrollY > 280
                    return {
                        headerTransparent: true,
                        headerTintColor: isShowHeader ? theme.colors.text : theme.colors.background,
                        headerTitle: () => <HeaderTitle navigation={navigation} isShowHeader={isShowHeader}/>,
                    }}
                }
            />
        </SettingsStack.Navigator>
    )
}

export default SearchNavigator