import React from 'react'
import { Container, SportsMemberCardContainer, SportsMemberName, SportsMemberInfo, MasterBadge } from './styled'
import styled from 'styled-components/native'

const InfoText =  styled.View`
    margin-left: 16px;
    justify-content: center;
`

const InfoImage =  styled.View`
    width: 36px;
    height: 36px;
`

const MemberImage = styled.Image`
    width: 100%;
    height: 50px;
    border-radius: 50px;
    flex: 1;
    /* resize-mode: cover; */
`

interface IProps {
    member: any;
}

const SportsMemberCard: React.FC<IProps> = ({
    member,
}: IProps) => {
    // const navigation = useNavigation<StackNavigationProp<SportsNavigatorParams>>();
    const { id, name, nickName, age, gender, level, image } = member
    return (
        <Container onPress={() => console.log('dd') /*navigation.navigate('Detail')*/}>
            <SportsMemberCardContainer>
                <InfoImage>
                    {/* <MemberImage source={image ? { uri: image } :require('../../assets/image.png')} /> */}
                </InfoImage>
                <InfoText>
                    <SportsMemberName>{name}({nickName})</SportsMemberName>
                    <SportsMemberInfo>{age} {gender}</SportsMemberInfo>
                </InfoText>
                {level && level == 99 && (
                    <MasterBadge>
                        클럽장
                    </MasterBadge>
                )}
            </SportsMemberCardContainer>
        </Container>
    )
}

export default SportsMemberCard