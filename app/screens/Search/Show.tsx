import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Post } from '../../components/Card/Posts/PostCard'
import { PostContents } from '../../components/Contents'
import HeaderCarouselScrollView from '../../components/HeaderCarouselScrollView'
import { LoaderPostShow } from '../../components/Loader/Posts'
import { usePost } from '../../hooks/graphql/posts'
import { SearchNavigatorParams } from '../../types/navigation'

type Props = {
    navigation: StackNavigationProp<SearchNavigatorParams, 'Show'>,
    route: RouteProp<SearchNavigatorParams, 'Show'>
}

const Show: React.FC<Props> = ({ navigation, route }: Props) => {
    const { post: postParam } = route.params
    const [post, setPost] = useState<Post>(postParam)
    const { data, loading } = usePost({ id: postParam.id })

    useEffect(() => {
        if (data?.post){
            setPost(data.post)
            navigation.setParams({ post: data.post })
        }
    }, [data])

    const ChildComponents = () => {
        return loading ? (
            <LoaderPostShow />
        ) : (
            <PostContents post={post}/>
        )
    }

    const images = [0,1,2]
    return (
        <HeaderCarouselScrollView
            images={images}
            childComponents={<ChildComponents/>}
            // data={[]}
            // renderItem={renderItem}
        >
        </HeaderCarouselScrollView>

    )
}
export default Show
