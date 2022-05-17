import styled from 'styled-components'
import { Profile } from '../Card/Posts/Parts'
import { Post } from '../Card/Posts/PostCard'
import TextStyles from '../styled/TextStyles'
import { Text, View } from '../Themed'

type Props = {
    post: Post
}

const PostContents = ({ post }: Props) => {
    const { title, contents } = post
    return (
        <PostContainer>
            <PostTitle>{title}</PostTitle>
            <ProfileBox>
                <Profile name='Eung' />
            </ProfileBox>
            <ContentsBox>
                <Text>{contents}</Text>
            </ContentsBox>
        </PostContainer>
    )
}

const PostContainer = styled(View)`
    margin: 12px;
`

const ProfileBox = styled(View)`
    margin: 12px 0;
`

const ContentsBox = styled(View)`
    margin: 12px 0;
`

const PostTitle = styled(TextStyles.Bold)`
    font-size: 24px;
`

export default PostContents