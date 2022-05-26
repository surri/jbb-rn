import React, { useEffect, useRef, useState } from 'react'
import Animated from 'react-native-reanimated'
import io from 'socket.io-client'
import styled from 'styled-components/native'
import TextStyles from '../../components/styled/TextStyles'
import { RouteProp, useIsFocused, useTheme } from '@react-navigation/native'
import theme from '../../theme'
import { KeyboardAvoidingView, Text, TextInput, View } from '../../components/Themed'
import { FlatList, Platform, SafeAreaView } from 'react-native'
import { RootStackParams } from '../../types/navigation'
import { useRecoilValue } from 'recoil'
import { userState } from '../../recoil/selectors'
import moment from 'moment'
import { useMessages } from '../../hooks/graphql/messages'

// const socketEndpoint = 'http://localhost:3000/messages'
const socketEndpoint = 'https://api.jangbibbal.com/messages'

type Props = {
    route: RouteProp<RootStackParams, 'Chat'>
}

const Show: React.FC<Props> = ({ route }: Props) => {

    const { post, chat } = route.params || {}

    const isFocused = useIsFocused()
    const theme = useTheme()
    const [hasConnection, setConnection] = useState(false)

    const Test =() => {
        console.log(user)
    }


    const { data, error, called } = useMessages({ chatId: chat.id })

    const [lastMessage, setLastMessage] = useState()


    const [messages, setMessages] = useState()
    const [newMessage, setNewMessage] = useState('')


    useEffect(() => {
        const { messages } = data || {}
        if (messages){
            messages?.edges && setMessages(messages.edges)
        }
    }, [data])

    useEffect(() => {
        messages && typeof messages == 'object' && messages.length > 0 && setLastMessage(messages.filter(m => m.mine && m.unread).pop())
    }, [messages])

    const flatListRef = useRef(null)

    const socket = io(socketEndpoint, {
        transports: ['websocket'],
    })

    socket.io.on('open', () => setConnection(true))
    socket.io.on('close', () => setConnection(false))

    const [messageLoading, setMessageLoading] = useState(false)
    const [messageResult, setMessageResult] = useState(false)

    useEffect(() => {
        socket.on('sended', (sended: boolean) => {
            setMessageLoading(false)
            setMessageResult(sended)
            // setMessages(prevMessages => prevMessages.concat(sendedMessage))
            // setLastMessage(sendedMessage)
        })

        socket.on('responseMessages', (data:any) => {
            // console.log(data)
        })

        if (isFocused) {
            Test()
            // console.log(chat)
            console.log('tesataset')
            // socket.emit('requestMessages' )
        } else {

            socket.disconnect()
            socket.removeAllListeners()
        }
    }, [])


    // socket.emit('msg', { type: 'msg', socketId: socket.id, msg: 'chatshow' })
    //     return () => {
    //         socket.disconnect()
    //         socket.removeAllListeners()
    //     }
    // }, [])


    useEffect(() => {
        if(flatListRef.current){
            flatListRef.current?.scrollToEnd()
        }
    },[messages])

    const user = useRecoilValue(userState)


    const onSendMessage = () => {
        // socket.emit('sendMessage', {
        //     socketId: socket.id,
        //     receiverId: Number(post.userId),
        //     senderId: Number(user.id),
        //     postId: Number(post.id),
        //     message: newMessage,
        // })
        setNewMessage('')
        setMessageLoading(true)
    }

    console.log(hasConnection, 'hasConnection')

    return hasConnection && (
        <KeyboardAvoidingView
            style={{ flexGrow: 1 }}
            keyboardVerticalOffset={
                Platform.select({
                    ios: 100,
                    android: 200,
                })
            }
        >
            <SafeAreaView
                style={{ flex: 1 }}
            >
                <FlatList
                    ref={flatListRef}
                    // onContentSizeChange={() => flatListRef?.current?.scrollToEnd()}
                    // onLayout={() => flatListRef?.current?.scrollToEnd()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    data={messages}
                    renderItem={({ item: { node: message } }: any) => message.mine ? (
                        <MessageContainer mine={message.mine}>
                            <ReceivedTime>{moment(message.createdAt).format('hh:mm')}</ReceivedTime>
                            <View style={{ flexDirection: 'column' }}>
                                <MessageBox backgroundColor={theme.colors.active}>
                                    <MessageText color={theme.colors.background}>
                                        {message.message}
                                    </MessageText>
                                </MessageBox>
                                <Readed>{!message.sended && '전송실패'}{lastMessage.id == message.id && '안읽음'}</Readed>
                            </View>
                        </MessageContainer>
                    ) : (
                        <MessageContainer mine={message.mine}>
                            <MessageBox backgroundColor={theme.colors.inactive}>
                                <MessageText color={theme.colors.text}>
                                    {message.message}
                                </MessageText>
                            </MessageBox>
                            <View style={{ flexDirection: 'column' }}>
                                <Readed> </Readed>
                                <ReceivedTime>{moment(message.createdAt).format('hh:mm')}</ReceivedTime>
                            </View>
                        </MessageContainer>
                    )}
                />
                <MessageInputContainer>
                    <MessageInput
                        placeholder="Message"
                        placeholderTextColor={theme.colors.inactive}
                        onChangeText={text => setNewMessage(text)}
                        value={newMessage}
                        onFocus={() => {
                            setTimeout(() => {
                                if (flatListRef.current) {
                                    flatListRef.current.scrollToEnd()
                                }
                            }, 100)
                        }}
                        onSubmitEditing={onSendMessage}
                    />
                    <SendButtonBox
                        onPress={onSendMessage}
                        disabled={newMessage.length < 1}
                    >
                        <SendButtonText color={newMessage.length < 1 ? theme.colors.inactive : theme.colors.active}>
                             보내기
                        </SendButtonText>
                    </SendButtonBox>
                </MessageInputContainer>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

type StyledMessage = {
    mine?: boolean,
    color?: string,
    borderColor?: string,
    backgroundColor?: string,
}

const SendButtonBox = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding: 0 8px;
`

const SendButtonText = styled(TextStyles.Bold)`
    color: ${(props: StyledMessage) => props.color};
`

const MessageInputContainer = styled(Animated.View)`
    flex-direction: row;
    margin: 12px;
    border: 2px solid ${(props) => props.theme.colors.active};
    border-radius: 20px;
`
const MessageInput = styled.TextInput`
    flex: 1;
    padding: 12px 20px;
    font-family: 'notosans-medium';
`

const MessageContainer = styled.View`
    flex-direction: row;
    align-self: ${(props: StyledMessage) => props.mine ? 'flex-end' : 'flex-start'};
    align-items: center;
`

const MessageBox = styled.View`
    background-color: ${(props: StyledMessage) => props.backgroundColor};
    padding: 12px;
    margin: 8px 12px;
    border-radius: 24px;
`

const MessageText = styled(TextStyles.Medium)`
    color: ${(props: StyledMessage) => props.color};
`

const ReceivedTime = styled(TextStyles.Medium)`
    color: ${(props) => props.theme.colors.placeHolder};
`

const Readed = styled(TextStyles.Medium)`
    align-self: flex-end;
    margin: 0 24px;
    color: ${(props) => props.theme.colors.placeHolder};
`

// const testMessages: any = [
//     {
//         id: 1,
//         message: 'hihi',
//         createdAt: '2022-05-23T21:20:34.000Z',
//         unread: false,
//     },
//     {
//         id: 2,
//         message: 'hoho',
//         mine: true,
//         createdAt: '2022-05-23T21:22:42.000Z',
//         unread: false,
//     },
//     {
//         id: 3,
//         message: 'who are you',
//         createdAt: '2022-05-23T21:26:43.000Z',
//         unread: false,
//     },
//     {
//         id: 4,
//         message: 'its me',
//         mine: true,
//         createdAt: '2022-05-23T21:42:12.000Z',
//         unread: true,
//         sended: true,
//     },
// ]
export default Show