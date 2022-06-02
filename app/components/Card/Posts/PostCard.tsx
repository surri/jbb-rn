import React, { useState } from 'react'
import styled from 'styled-components/native'
import TextStyles from '../../styled/TextStyles'
import { Card } from '../../Themed'
import { Thumbnail, UserCard } from './Parts'
import moment from 'moment'
import 'moment/locale/ko'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { SearchNavigatorParams } from '../../../types/navigation'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import useUpdatePostsLike from '../../../hooks/graphql/posts/useUpdatePostLike'

export type Post = {
    id: number,
    title: string,
    contents: string,
    price: number,
    author: string,
    createdAt: string,
    userId: number,
    likes: number,
    like: boolean,
    chat: {
        id: number
    }
    mine: boolean,
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
            id: postId,
            createdAt,
            title,
            price,
            author,
            mine,
            likes,
            like,
            userId,
        },
    } = post

    const theme = useTheme()

    const [updatePostsLike] = useUpdatePostsLike()

    const [acitiveLike, setActiveLike] = useState(like)
    const [likeCount, setLikeCount] = useState(likes)

    const onPressLike = async () => {
        setActiveLike(prevLike => !prevLike)
        try {
            await updatePostsLike({
                variables: { postId: Number(postId) },
            }).then(({ data }) => {
                setActiveLike(data.updatePostsLike.like) //sync server data double check
                setLikeCount(data.updatePostsLike.likes)
            }).catch(err =>console.log(JSON.stringify(err),'err'))
        } catch (e) {
            console.log(e,'e')
            // setStatus('Error')
        }
    }

    return (
        <Container
            onPress={() => navigation.navigate('Show', { post: post.node })}
        >
            <ThumbnailContainer>
                <Thumbnail/>
            </ThumbnailContainer>
            <InfoContainer>
                <ProfileRow>
                    <UserCard user={{ userId, author }} />
                    <Row><PostDate>{moment(createdAt).fromNow()}</PostDate></Row>
                </ProfileRow>
                <InfoRow>
                    <Row><PostTitle>{title}</PostTitle></Row>
                </InfoRow>
                <InfoRow>
                    <Row><Price>{price ? `${price.toLocaleString('ko-KR')}원` : '무료나눔'}</Price></Row>
                    {!mine && (
                        <LikeButton
                            onPress={onPressLike}
                        >
                            {acitiveLike
                                ? <ActiveLikeIcon name="heart" size={16} color={theme.colors.active} />
                                : <LikeIcon name="heart" size={16} color={theme.colors.placeHolder} />
                            }
                            <LikeCount>{likeCount}</LikeCount>
                        </LikeButton>
                    )}
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


const LikeButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`

const LikeIcon = styled(Feather)`
    margin-right: 4px;
`
const ActiveLikeIcon = styled(FontAwesome)`
    margin-right: 4px;
`

const LikeCount = styled(TextStyles.Regular)`
    font-size: 14px;
    color: ${props => props.theme.colors.placeHolder};
    padding-bottom: 2px;
`

export default PostCard