import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeNavigatorParams } from '../../types/navigation'
import Main from '../../screens/Home/Home'
import { Pressable, View } from 'react-native'
import { Text } from '../../components/Themed'
import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
// import SearchBar from '../components/Header/SearchBar';
// import HeaderLeft from '../components/Header/HeaderLeft';

const HomeStack = createStackNavigator<HomeNavigatorParams>()

const HomeNavigator: React.FC = () => {
    const theme = useTheme()
    return (
        <HomeStack.Navigator
            screenOptions={({ navigation }) => ({
                headerTransparent: true,
                headerTitle: () => (
                    <Pressable
                        onPress={() => navigation.navigate('Modal')}
                        style={({ pressed }) => ({
                            opacity: pressed ? 0.5 : 1,
                        })}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.colors.text }}>골프</Text>
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
            <HomeStack.Screen name="Main" component={Main} />
        </HomeStack.Navigator>
    )
}

export default HomeNavigator