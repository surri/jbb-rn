import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Platform, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { Text, View } from '../components/Themed'
import { HotPlace } from '../types'
import {
    MenuProvider,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu'
export default function EditSportsModal() {
    const colorScheme = useColorScheme()

    const sports = [
        {
            id: 1,
            name: 'golf',
            nameKR: '골프',
        },
    ]

    const Item = ({ item }: { item: HotPlace }) => (
        <>
            <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Left button pressed')} >
                <Text style={styles.fixToText}>{item.nameKR}</Text>
            </TouchableOpacity>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </>
    )


    return (
        <MenuProvider>
            <View style={styles.container}>
                <Text style={styles.title}></Text>
                <View style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',

                }}>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    {sports.map((item, index: number) => <Item item={item} key={index}/>)}
                </View>
                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            </View>
        </MenuProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '100%',
    },
    fixToText: {
        color: '#6667ab',
        fontSize: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // backgroundColor: '#6667ab9e',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#6667ab',
    },
})
