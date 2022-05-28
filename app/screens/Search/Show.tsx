import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components/native'
import { Post } from '../../components/Card/Posts/PostCard'
import { PostContents } from '../../components/Contents'
import HeaderCarouselScrollView from '../../components/HeaderCarouselScrollView'
import { LoaderPostShow } from '../../components/Loader/Posts'
import TextStyles from '../../components/styled/TextStyles'
import { Button } from '../../components/Themed'
import { usePost } from '../../hooks/graphql/posts'
import { SearchNavigatorParams, RootStackParams } from '../../types/navigation'

type Props = {
    navigation: StackNavigationProp<SearchNavigatorParams, 'Show'>,
    route: RouteProp<SearchNavigatorParams, 'Show'>
}

const Show: React.FC<Props> = ({ navigation, route }: Props) => {
    const { post: postParam } = route.params
    const [post, setPost] = useState<Post>(postParam)
    const { data, loading } = usePost({ id: postParam.id })

    const rootNavigation = useNavigation<StackNavigationProp<RootStackParams>>()

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

    const ChildComponents = useMemo(() => LoadingComponents, [loading])

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
            <ButtonContainer
                onPress={() => rootNavigation.navigate('Chat', { post })}
            >
                <ButtonText>채팅하기</ButtonText>
            </ButtonContainer>
        </>

    )
}

const ButtonContainer = styled(Button)`
    justify-content: center;
    align-items: center;
    padding: 12px;
    margin: 12px;
    border-radius: 12px;
    border: 2px solid ${props => props.theme.colors.active}
`

const ButtonText = styled(TextStyles.Medium)`
    font-size: 16px;
    color: ${props => props.theme.colors.active}
`

export default Show
