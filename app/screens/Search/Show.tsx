import { Entypo } from '@expo/vector-icons'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components/native'
import { Post } from '../../components/Card/Posts/PostCard'
import { PostContents } from '../../components/Contents'
import HeaderCarouselScrollView from '../../components/HeaderCarouselScrollView'
import { LoaderPostShow } from '../../components/Loader/Posts'
import { Button } from '../../components/Themed'
import { usePost } from '../../hooks/graphql/posts'
import { SearchNavigatorParams, RootStackParams } from '../../types/navigation'
import { useTheme } from '@react-navigation/native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import useUpdatePostsLike from '../../hooks/graphql/posts/useUpdatePostLike'
import { UserCard } from '../../components/Card/Posts/Parts'

type Props = {
    navigation: StackNavigationProp<SearchNavigatorParams, 'Show'>,
    route: RouteProp<SearchNavigatorParams, 'Show'>
}

const Show: React.FC<Props> = ({ navigation, route }: Props) => {
    const { post: postParam } = route.params
    const [post, setPost] = useState<Post>(postParam)
    const { data, loading } = usePost({ id: postParam.id })

    const rootNavigation = useNavigation<StackNavigationProp<RootStackParams>>()

    const theme = useTheme()

    const [updatePostsLike] = useUpdatePostsLike()

    const [acitiveLike, setActiveLike] = useState(post.like)

    const onPressLike = async () => {
        setActiveLike(prevLike => !prevLike)
        try {
            await updatePostsLike({
                variables: { postId: Number(post.id) },
            }).then(({ data }) => {
                setActiveLike(data.updatePostsLike.like)
            }).catch(err =>console.log(JSON.stringify(err),'err'))
        } catch (e) {
            console.log(e,'e')
            // setStatus('Error')
        }
    }
    useEffect(() => {
        if (data?.post){
            setPost(data.post)
            navigation.setParams({ post: data.post })
        }
    }, [data])


    const LoadingComponents = () => {
        return loading ? (
            <LoaderPostShow />
        ) : (
            <PostContents post={post}/>
        )
    }

    const ChildComponents = useMemo(() => LoadingComponents, [post, loading])

    const images = [0,1,2]
    return (
        <>
            <HeaderCarouselScrollView
                images={images}
                childComponents={<ChildComponents/>}
            // data={[]}
            // renderItem={renderItem}
            >
            </HeaderCarouselScrollView>
            {!post.mine && (
                <ButtonContainer>
                    <ProfileBox>
                        <UserCard user={{ userId: post.userId, author: post.author }} size='sm' />
                    </ProfileBox>
                    <ActionButtonContainer>
                        <ButtonBox
                            onPress={onPressLike}
                        >
                            {acitiveLike
                                ? <FontAwesome name="heart" size={24} color={theme.colors.active} />
                                : <Feather name="heart" size={24} color={theme.colors.active} />
                            }
                        </ButtonBox>
                        <ButtonBox
                            onPress={() => rootNavigation.navigate('Chat', { post, ...(post?.chat && { chat: post.chat }) })}
                        >
                            <Entypo name="chat" size={24} color={theme.colors.active} />
                        </ButtonBox>
                    </ActionButtonContainer>
                </ButtonContainer>
            )}
        </>

    )
}

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ProfileBox = styled.View`
    margin: 12px 0;
    flex: 1;
`

const ActionButtonContainer= styled.View`
    flex-direction: row;
`

const ButtonBox = styled(Button)`
    justify-content: center;
    align-items: center;
    margin: 0 4px;
    padding: 12px;
    border-radius: 12px;
    border: 2px solid ${props => props.theme.colors.active};
`

export default Show
