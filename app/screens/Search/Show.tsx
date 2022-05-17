import { RouteProp } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Post } from '../../components/Card/Posts/PostCard'
import { PostContents } from '../../components/Contents'
import HeaderCarouselScrollView from '../../components/HeaderCarouselScrollView'
import { LoaderPostShow } from '../../components/Loader/Posts'
import usePostShow from '../../hooks/graphql/posts/usePost'
import { SearchNavigatorParams } from '../../types/navigation'

type Props = {
    route: RouteProp<SearchNavigatorParams, 'Show'>
}

const Show: React.FC<Props> = ({ route }: Props) => {
    const { post: postParam } = route.params
    const [post, setPost] = useState<Post>(postParam)
    const { data, loading } = usePostShow({ id: postParam.id, userId: postParam.userId })

    useEffect(() => {
        data?.post && setPost(data.post)
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
