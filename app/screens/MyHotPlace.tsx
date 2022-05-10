import { StyleSheet, TouchableOpacity } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View,  } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { useRecoilValue } from 'recoil'
import { usersSelector } from '../recoil/selectors'

export default function MyHotPlace({ navigation }: RootTabScreenProps<'MyHotPlace'>) {
    // const users = useRecoilValue(usersSelector)


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <TouchableOpacity onPress={() => navigation.replace('NotFound')}>
                <Text>Go to home ffffffscreen!</Text>
            </TouchableOpacity>
            <EditScreenInfo path="/screens/MyHotPlace.tsx" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
