import React from 'react'
import styled from 'styled-components/native'
import TextStyles from '../../styled/TextStyles'
import { Card, Text, View } from '../../Themed'
import { Profile, Thumbnail } from './Parts'

interface IProps {
    post: any;
}

interface PostWriter {
    color?: string;
}

const PostCard: React.FC<IProps> = ({ post }: IProps) => {
    const {
        node: {
            date,
            title,
        },
    } = post

    return (
        <Container>
            <Thumbnail/>
            <InfoContainer>
                <WriterRow>
                    <Profile/>
                    <Row><PostDate>1시간전</PostDate></Row>
                </WriterRow>
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
    margin: 12px 24px;
`

const InfoContainer = styled.View`
    flex: 1;
    padding: 4px 12px;
    justify-content: space-between;
`

const WriterRow = styled.View`
    flex-direction: row;
    margin-bottom: 4px;
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

const Price = styled(TextStyles.Bold)`
    font-size: 16px;
    padding-bottom: 8px;
`

const PostTitle = styled(TextStyles.Regular)`
    font-size: 16px;
    padding-bottom: 8px;
`

const PostWriter = styled(TextStyles.Regular)`
    color: ${(props: PostWriter) => props.color || '#000'};
    margin-right: 8px;
`
const PostDate = styled(TextStyles.Regular)`
    margin: 0 12px;
`
export default PostCard