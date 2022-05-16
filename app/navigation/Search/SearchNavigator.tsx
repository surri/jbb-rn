import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '@react-navigation/native'
import { SearchNavigatorParams } from '../../types/navigation'
import { Main, Show } from '../../screens/Search'
import { Pressable } from 'react-native'
import { Text, View } from '../../components/Themed'
import { FontAwesome } from '@expo/vector-icons'

const SettingsStack = createStackNavigator<SearchNavigatorParams>()

const SearchNavigator: React.FC = () => {
    const theme = useTheme()
    return (
        <SettingsStack.Navigator
            screenOptions={({ navigation, route }) => ({
                headerStyle: {
                    shadowColor: 'transparent',
                    backgroundColor: theme.colors.background,
                },
                headerTitle: () => (
                    <Pressable
                        onPress={() => navigation.navigate('Modal')}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.5 : 1,
                        })}>
                        {/* {console.log()} */}
                        <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: theme.colors.text,
                            }}
                            >골프</Text>
                            <FontAwesome
                                name="chevron-down"
                                size={16}
                                color={theme.colors.text}
                                style={{ marginLeft: 4 }}
                            />
                        </View>
                    </Pressable>
                ),
            })}
        >
            <SettingsStack.Screen name="Main" component={Main} />
            <SettingsStack.Screen name="Show" component={Show} />
        </SettingsStack.Navigator>
    )
}

export default SearchNavigator