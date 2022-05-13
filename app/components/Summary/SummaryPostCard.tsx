import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { SportsNavigatorParams } from '../../types/navigation'
import { Container, SportsPostCardContainer } from './styled'
import styled from 'styled-components/native'
import TextStyles from '../styled/TextStyles'

const InfoText =  styled.View`
    margin-left: 16px;
    justify-content: center;
    flex: 4;
`

const InfoImage =  styled.View`
    width: 48px;
    height: 48px;
`

const MemberImage = styled.Image`
    width: 100%;
    height: 50px;
    border-radius: 50px;
    flex: 1;
`

const RowInfo = styled.View`
    flex-direction: row;
    margin-top: 4px;
`


const SportsPostTitle = styled(TextStyles.Bold)`

`
const SportsPostNickName = styled(TextStyles.Regular)`
    flex: 1;
`
const SportsPostRegistAt= styled(TextStyles.Regular)`
    flex: 2;
`
const SportsPostViews = styled(TextStyles.Regular)`
    flex: 1;
`
const SportsPostCommentsCount= styled(TextStyles.Regular)`
    flex: 2;
`


interface IProps {
    posts: any;
}

const SportsPostCard: React.FC<IProps> = ({
    posts,
}: IProps) => {
    // const navigation = useNavigation<StackNavigationProp<SportsNavigatorParams>>();
    const { id, title, nickName, registAt, views, commentCount, memberImage } = posts
    return (
        <Container onPress={() => console.log('dd') /*navigation.navigate('Detail')*/}>
            <SportsPostCardContainer>
                <InfoImage>
                    <MemberImage source={memberImage ? { uri: memberImage } :require('../../assets/image.png')} />
                </InfoImage>
                <InfoText>
                    <SportsPostTitle>{title}</SportsPostTitle>
                    <RowInfo>
                        <SportsPostNickName>{nickName}</SportsPostNickName>
                        <SportsPostRegistAt>{registAt}</SportsPostRegistAt>
                    </RowInfo>
                    <RowInfo>
                        <SportsPostViews>조회{views}</SportsPostViews>
                        <SportsPostCommentsCount>{commentCount}</SportsPostCommentsCount>
                    </RowInfo>
                </InfoText>
            </SportsPostCardContainer>
        </Container>
    )
}

export default SportsPostCard