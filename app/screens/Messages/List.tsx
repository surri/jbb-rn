import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Animated, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native'
import { useRecoilValue } from 'recoil'
import io from 'socket.io-client'
import styled from 'styled-components/native'
import ChatCard from '../../components/Card/Messages/ChatCard'
import { userState } from '../../recoil/selectors'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Text, View } from '../../components/Themed'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { ChatPartition } from '../../components/Card/Messages/Parts'
import useWait from '../../hooks/useWait'
import useChatList from '../../hooks/graphql/messages/useChatList'

// const socketEndpoint = 'http://localhost:3004/messages'
const socketEndpoint = 'https://api.jangbibbal.com/messages'

const List: React.FC = () => {
    const [hasConnection, setConnection] = useState(false)
    const [time, setTime] = useState<string | null>(null)
    const user = useRecoilValue(userState)

    const theme = useTheme()

    const socket = io(socketEndpoint, {
        transports: ['websocket'],
    })

    const [refreshing, setRefreshing] = useState(false)
    const wait = useWait()

    const isFocused = useIsFocused()
    const [chatList, setChatList] = useState()

    const { data, refetch, error, called } = useChatList()

    useEffect(() => {
        const { chatList } = data || {}
        if (chatList){
            chatList?.edges && setChatList(chatList.edges)
        }
    }, [data])


    //test
    const [bell, setBell] = useState(true)

    useEffect(() => {
        socket.on('responseChatList', (responseChatList: any) => {
            // console.log(responseChatList)
            setChatList(responseChatList)
            // setMessages(prevMessages => prevMessages.concat(sendedMessage))
            // setLastMessage(sendedMessage)
        })
        if (isFocused) {
            refetch()
            // socket.emit('requestChatList', { socketId: socket.id, userId: user.id })
        } else {
            socket.disconnect()
            socket.removeAllListeners()
        }
    }, [isFocused])

    socket.io.on('open', () => setConnection(true))
    socket.io.on('close', () => setConnection(false))

    socket.on('msg', (data) => {
        // console.log(data.message)
    })

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow()
        }
    }

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey)
        // const newData = [...listData]
        // const prevIndex = listData.findIndex(item => item.key === rowKey)
        // newData.splice(prevIndex, 1)
        // setListData(newData)
    }

    const onLeave = () => {
        Alert.alert(
            '채팅방 나가기',
            '채팅방에서 나간후에는 모든 대화내용이 삭제됩니다',
            [
                {
                    text: '나가기',
                    onPress: () => console.log('Yes Pressed'),
                },
                {
                    text: '취소',
                    onPress: () => console.log('No Pressed'), style: 'cancel',
                },
            ],
            { cancelable: false },
        )
    }

    const HiddenItemWithActions = (props: any) => {
        const {
            rightActionActivated,
            onClose,
            onDelete,
        } = props

        if (rightActionActivated) {
            onLeave()
        }

        return (
            <Animated.View style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // height: rowHeightAnimatedValue,
            }}>
                <TouchableOpacity
                    onPress={() => setBell(!bell)}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        height: '100%',
                        backgroundColor: theme.colors.active,
                        paddingVertical: 32,
                        paddingHorizontal: 32,
                    }}
                >
                    <Feather name={bell ? 'bell' : 'bell-off'} size={32} color={'#ffffff'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onLeave()}
                    style={
                        {
                            flex: 3,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            height: '100%',
                            backgroundColor: '#a40000',
                            paddingVertical: 32,
                            paddingHorizontal: 32,
                        }
                    }>
                    <Ionicons name="exit" size={32} color={'#ffffff'} />
                </TouchableOpacity>
            </Animated.View>
        )
    }
    const renderHiddenItem = (data, rowMap) => {
        const rowActionAnimatedValue = new Animated.Value(80)

        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}
            />
        )
    }

    const onRightAction = rowKey => {
        console.log('onRightAction', rowKey)
    }
    const onRightActionStatusChange = rowKey => {
        console.log('onRightActionStatusChange', rowKey)
    }

    const onRefresh = () => {
        setRefreshing(true)
        refetch()
        wait(1000).then(() => setRefreshing(false))
    }

    return (
        <SwipeListView
            scrollEventThrottle={16}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            data={chatList}
            renderItem={ ({ item }, rowMap) => {
                return (
                    <ChatCard
                        chat={item}
                    />
                )
            }}
            ItemSeparatorComponent={() => <ChatPartition />}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={100}
            stopLeftSwipe={120}
            rightOpenValue={-100}
            rightActivationValue={-180}
            onRightAction={onRightAction}
            onRightActionStatusChange={onRightActionStatusChange}
        />


    )
}

export default List
