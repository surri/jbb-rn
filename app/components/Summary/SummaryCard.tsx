import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { SportsNavigatorParams } from '../../types/navigation'
import { Container, InfoContainer, SportsName, SportsAddress, SummaryName, MemberTotal, SportsCardContainer } from './styled'
import styled from 'styled-components/native'

interface IProps {
    sports: any;
}

const InfoText =  styled.View`
    flex: 4;
    margin-left: 16px;
    justify-content: center;
`

const InfoImage =  styled.View`
    width: 64px;
    height: 64px;
    border-radius: 8px;
`

const SportsImage = styled.Image`
    width: 100%;
    height: 50px;
    border-radius: 5px;
    flex: 1;
    /* resize-mode: cover; */
`

const MemberInfo =  styled.View`
    flex: 1;
    flex-direction: row;
    width: 64px;
    height: 64px;
    justify-content: center;
`


const SportsCard: React.FC<IProps> = ({
    sports,
}: IProps) => {
    const navigation = useNavigation<StackNavigationProp<SportsNavigatorParams>>()
    const { name, address, SummaryName, memberTotal, image } = sports
    return (
        <SportsCardContainer>
            <Container onPress={() => navigation.navigate('Detail', { sports })}>
                <InfoContainer>
                    <InfoImage>
                        {/* <SportsImage source={image ? { uri: image } :require('../../assets/image.png')} /> */}
                    </InfoImage>
                    <InfoText>
                        <SportsName>{name}</SportsName>
                        <SportsAddress>{address}</SportsAddress>
                        <SummaryName>{SummaryName}</SummaryName>
                    </InfoText>
                    <MemberInfo>
                        <MemberTotal>{memberTotal}명</MemberTotal>
                    </MemberInfo>
                </InfoContainer>
            </Container>
        </SportsCardContainer>
    )
}

export default SportsCard