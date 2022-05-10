import React from 'react'
import styled from 'styled-components/native'
import TextStyles from '../styled/TextStyles'

interface IProps {
    post: any;
}

interface PostWriter {
    color?: string;
}

const Container = styled.View`
`
export const InfoContainer = styled.View`
    flex-direction: row;
`
export const PostTitle = styled(TextStyles.R3214)`
    padding-bottom: 8px;
`

export const PostWriter = styled(TextStyles.R2414)`
    color: ${(props: PostWriter) => props.color || '#000'};
    margin-right: 8px;
`
//#gray2
export const PostDate = styled(TextStyles.R2414)`
    color: #999999;
`

const PostCard: React.FC<IProps> = ({ post }: IProps) => {

    const isMine = post.writer == '홍길순'
    const isNotice = post.writer == '공지'
    const writeColor = isMine ? '#8966ff' : isNotice ? '#ec1c5b' : '#000'
    return (
        <Container>
            <InfoContainer>
                <PostWriter color={writeColor}>{post.writer}</PostWriter>
                <PostDate>{post.date}</PostDate>
            </InfoContainer>
            <PostTitle>{post.title}</PostTitle>
        </Container>
    )
}

export default PostCard