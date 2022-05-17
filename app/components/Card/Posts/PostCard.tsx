import React from 'react'
import styled from 'styled-components/native'
import TextStyles from '../../styled/TextStyles'
import { Card } from '../../Themed'
import { Profile, Thumbnail } from './Parts'
import moment from 'moment'
import 'moment/locale/ko'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { SearchNavigatorParams } from '../../../types/navigation'

export type Post = {
    id: number,
    title: string,
    contents: string,
    author: string,
    createdAt: string,
}

interface IProps {
    post: {
        node: Post
    }
}

const PostCard: React.FC<IProps> = ({ post }: IProps) => {
    const navigation = useNavigation<StackNavigationProp<SearchNavigatorParams>>()
    const {
        node: {
            createdAt,
            title,
            author,
        },
    } = post

    return (
        <Container
            onPress={() => navigation.navigate('Show')}
        >
            <ThumbnailContainer>
                <Thumbnail/>
            </ThumbnailContainer>
            <InfoContainer>
                <ProfileRow>
                    <Profile
                        name={author}
                    />
                    <Row><PostDate>{moment(createdAt).fromNow()}</PostDate></Row>
                </ProfileRow>
                <InfoRow>
                    <Row><PostTitle>{title}</PostTitle></Row>
                </InfoRow>
                <InfoRow>
                    <Row><Price>20,000원</Price></Row>
                    <Row><Price>❤️</Price></Row>
                </InfoRow>
            </InfoContainer>
        </Container>
    )
}

const Container = styled(Card)`
    flex-direction: row;
    align-items: center;
    margin: 12px;
    height: 120px;
`

const ThumbnailContainer = styled.View`
    flex: 1;
`

const InfoContainer = styled.View`
    flex: 2;
    padding: 4px 12px 4px 20px;
    justify-content: space-between;
`

const ProfileRow = styled.View`
    flex:1;
    flex-direction: row;
    justify-content: space-between;
`

const InfoRow = styled.View`
    flex:1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const Row = styled.View`
    justify-content: center;
`

const Price = styled(TextStyles.Bold)`
    font-size: 16px;
`

const PostTitle = styled(TextStyles.Regular)`
    font-size: 16px;
`

const PostDate = styled(TextStyles.Regular)``
export default PostCard