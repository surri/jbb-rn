import React, { useEffect, useMemo, useRef, useState } from 'react'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import TextStyles from '../../components/styled/TextStyles'
import { RouteProp, useIsFocused, useTheme } from '@react-navigation/native'
import { KeyboardAvoidingView } from '../../components/Themed'
import { FlatList, Platform, SafeAreaView } from 'react-native'
import { RootStackParams } from '../../types/navigation'
import { useRecoilValue } from 'recoil'
import { userState } from '../../recoil/selectors'
import { useMessages } from '../../hooks/graphql/messages'
import MessageCard from '../../components/Card/Messages/MessageCard'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSocket } from '../../hooks/socket'


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
    navigation: StackNavigationProp<RootStackParams, 'Chat'>,
}

const Show: React.FC<Props> = ({ route, navigation }: Props) => {
    const { post, chat } = route.params || {}

    // const [chat, setChat] = useState(chatParam)
    const flatListRef = useRef(null)
    const theme = useTheme()
    const isFocused = useIsFocused()

    const user = useRecoilValue(userState)

    const socket = useSocket()

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
            getMessages().then(({ data }) => {
                const { messages } = data || {}
                if (messages){
                    messages?.edges && setMessages(messages.edges)
                    messages?.pageInfo && setPageInfo(messages.pageInfo)
                }
            })
        }
    }, [chat, data])

    const [messageLoading, setMessageLoading] = useState(false)
    const [messageResult, setMessageResult] = useState(false)

    useMemo(() => {
        if (socket) {
            socket.emit('joinRoom', {
                socketId: socket.id,
                chatId: Number(chat.id),
                senderId: Number(user.id),
            })
            socket.emit('testList')
            // socket.on('sended', (sended: boolean) => {
            //     setMessageLoading(false)
            //     setMessageResult(sended)
            //     // setMessages(prevMessages => prevMessages.concat(sendedMessage))
            //     // setLastMessage(sendedMessage)
            // })

            socket.on('Test', (test: any) => {
                console.log(test,'test')
            // setMessages(prevMessages => prevMessages.concat(sendedMessage))
            // setLastMessage(sendedMessage)
            })
            socket.on('fetchNewMessage', (hasNewMessage: any) => hasNewMessage && refetch())
        }
    }, [socket])

    // useEffect(() =>
    //     navigation.addListener('beforeRemove', (e) => {
    //         if( socket) {
    //             socket.disconnect()
    //             socket.removeAllListeners()
    //         }
    //     }),[navigation])
    const onSendMessage = () => {
        if( socket) {
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
                    keyboardDismissMode='on-drag'
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'flex-end',
                    }}
                    inverted
                    scrollEventThrottle={4}
                    onEndReachedThreshold={0.2}
                    onEndReached={onEndReached}
                    data={messages}
                    renderItem={({ item }) => <MessageCard message={item}/>}
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
    color: ${props => props.theme.colors.text};
    font-family: 'notosans-medium';
`

export default Show