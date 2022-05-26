import React from 'react'
import styled from 'styled-components/native'
import TextStyles from '../../styled/TextStyles'
import moment from 'moment'
import 'moment/locale/ko'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../../types/navigation'
import { Thumbnail } from './Parts'

export type Post = {
    id: number,
    title: string,
    contents: string,
    author: string,
    createdAt: string,
    userId: number,
}

interface IProps {
    chat: any
}

const ChatCard: React.FC<IProps> = ({ chat }: IProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
    const {
        id,
        message,
        createdAt,
    } = chat

    return (
        <Container
            onPress={() => {
                navigation.navigate('Chat', { chat: { id } })
                console.log('chat')
            }}
        >
            <ThumbnailContainer>
                <Thumbnail/>
            </ThumbnailContainer>
            <InfoContainer>
                <ProfileRow>
                    <UserName>Eung{id}</UserName>
                </ProfileRow>
                <InfoRow>
                    <Row><PostTitle>{message}</PostTitle></Row>
                </InfoRow>
            </InfoContainer>
            <DateContainer>
                <Row><PostDate>{moment(createdAt).fromNow()}</PostDate></Row>
            </DateContainer>
        </Container>
    )
}

const Container = styled.Pressable`
    flex-direction: row;
    align-items: center;
    height: 92px;
    padding: 12px;
    background-color: ${props => props.theme.colors.background};
`

const ThumbnailContainer = styled.View`
    flex: 4;
    padding: 4px;
`

const InfoContainer = styled.View`
    flex: 12;
    justify-content: space-between;
    padding: 0 4px;
`

const DateContainer = styled.View`
    flex: 3;
`

const ProfileRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

const InfoRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Row = styled.View`
    justify-content: center;
`

const UserName = styled(TextStyles.Bold)`
    font-size: 16px;
`

const PostTitle = styled(TextStyles.Regular)`
    font-size: 16px;
    color: ${props => props.theme.colors.placeHolder};
`

const PostDate = styled(TextStyles.Regular)``
export default ChatCard