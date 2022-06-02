import styled from 'styled-components'
import { Profile } from '../Card/Posts/Parts'
import { Post } from '../Card/Posts/PostCard'
import TextStyles from '../styled/TextStyles'
import { View } from '../Themed'

type Props = {
    post: Post
}

const PostContents = ({ post }: Props) => {
    const { title, contents, price } = post
    return (
        <PostContainer>
            <PostTitle>{title}</PostTitle>
            <PostTitle>{price ? `${price.toLocaleString('ko-KR')}원` : '무료나눔'}</PostTitle>
            <ContentsBox>
                <ContentsText>{contents}</ContentsText>
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
const ContentsText = styled(TextStyles.Medium)`
    font-size: 16px;
    line-height: 24px;
`

const PostTitle = styled(TextStyles.Bold)`
    font-size: 24px;
`

export default PostContents