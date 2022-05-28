import React, { useEffect, useRef, useState } from 'react'
import Animated from 'react-native-reanimated'
import io from 'socket.io-client'
import styled from 'styled-components/native'
import TextStyles from '../../components/styled/TextStyles'
import { RouteProp, useIsFocused, useTheme } from '@react-navigation/native'
import { KeyboardAvoidingView, View } from '../../components/Themed'
import { FlatList, Platform, SafeAreaView } from 'react-native'
import { RootStackParams } from '../../types/navigation'
import { useRecoilValue } from 'recoil'
import { userState } from '../../recoil/selectors'
import moment from 'moment'
import { useMessages } from '../../hooks/graphql/messages'

const socketEndpoint = 'http://localhost:3000/messages'
// const socketEndpoint = 'https://api.jangbibbal.com/messages'

type PagingMessage = {
    node: {
        id?: number,
        createdAt?: string,
        message: string,
        mine: boolean
    },
    cursor?: string,
}

type PageInfo = {
    hasNextPage: boolean,
    hasPrevPage: boolean,
    startCursor?: string,
    endCursor?: string,
}

type Props = {
    route: RouteProp<RootStackParams, 'Chat'>
}

const Show: React.FC<Props> = ({ route }: Props) => {
    const { post, chat } = route.params || {}
    // const [chat, setChat] = useState(chatParam)
    const flatListRef = useRef(null)
    const theme = useTheme()
    const isFocused = useIsFocused()

    const user = useRecoilValue(userState)

    const [hasConnection, setConnection] = useState(false)

    const [messages, setMessages] = useState<PagingMessage[]>([])
    const [newMessage, setNewMessage] = useState('')


    const [after, setAfter] = useState<string| undefined>()

    const [pageInfo, setPageInfo] = useState<PageInfo>()

    const [
        getMessages,
        { called, loading, data, refetch },
    ] = useMessages({
        chatId: Number(chat.id),
        ...(after && { after }),
    })

    useEffect(() => {
        if(chat.id){
            console.log('request useMessages',{
                chatId: Number(chat.id),
                ...(after && { after }),
            })
            getMessages().then(({ data }) => {
                const { messages } = data || {}
                if (messages){
                    messages?.edges && setMessages(messages.edges)
                    messages?.pageInfo && setPageInfo(messages.pageInfo)
                }
            })
        }
    }, [chat, data])

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

        // socket.on('fetchNewMessage', (hasNewMessage: boolean) => hasNewMessage && refetch())

        if (isFocused) {
            console.log('tesataset')
        } else {

            socket.disconnect()
            socket.removeAllListeners()
        }
    }, [])

    const onSendMessage = () => {
        if (chat?.id) {
            socket.emit('sendMessage', {
                socketId: socket.id,
                chatId: Number(chat.id),
                senderId: Number(user.id),
                message: newMessage,
            })
        } else if (post) {
            socket.emit('createChatAndSendMessage', {
                socketId: socket.id,
                receiverId: Number(post.userId),
                senderId: Number(user.id),
                postId: Number(post.id),
                message: newMessage,
            })
        }

        setMessages((prevMessage) => [
            {
                node: {
                    message: newMessage,
                    mine: true,
                },
            },
            ...prevMessage,
        ])
        setNewMessage('')
        setMessageLoading(true)
    }

    const onEndReached = () => {
        const { hasNextPage, endCursor } = pageInfo || {}
        // console.log(endCursor)
        // hasNextPage && setAfter(endCursor)
    }

    // useEffect(() => {
    //     getMessages().then(({ data }) => {
    //         const { messages } = data || {}
    //         if (messages){
    //             messages?.edges && setMessages(messages.edges)
    //         }
    //     })
    // }, [after])

    return (
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
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'flex-end',
                    }}
                    inverted
                    scrollEventThrottle={4}
                    onEndReachedThreshold={0.2}
                    onEndReached={onEndReached}
                    data={messages}
                    renderItem={({ item: { node: message } }: any) => message?.mine ? (
                        <MessageContainer mine={message.mine}>
                            <ReceivedTime>{moment(message.createdAt).format('hh:mm')}</ReceivedTime>
                            <View style={{ flexDirection: 'column' }}>
                                <MessageBox backgroundColor={theme.colors.active}>
                                    <MessageText color={theme.colors.background}>
                                        {message.message}
                                    </MessageText>
                                </MessageBox>
                                {/* <Readed>{!message.sended && '전송실패'}{lastMessage.id == message.id && '안읽음'}</Readed> */}
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
export default Show