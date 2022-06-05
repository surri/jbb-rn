import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import TextStyles from '../../components/styled/TextStyles'
import { useEffect, useState } from 'react'
import { useReportPostCategories } from '../../hooks/graphql/repots'
import { ScrollView, View } from '../../components/Themed'
import { StackNavigationProp } from '@react-navigation/stack'
import { SettingsNavigatorParams } from '../../types/navigation'
import { RouteProp } from '@react-navigation/native'

type Props = {
    navigation: StackNavigationProp<SettingsNavigatorParams, 'Account'>,
    route: RouteProp<SettingsNavigatorParams, 'Account'>
}

const Account: React.FC<Props> = ({ navigation, route }:Props) => {
    const { data, loading, called } = useReportPostCategories()


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderContainer>
                    <HeaderInfoTitle>왜 이 게시물을 신고하려하시나요?</HeaderInfoTitle>
                    <HeaderInfoDescription>신고하려는 이유를 선택해주세요.</HeaderInfoDescription>
                    <HeaderInfoDescription>신고 내용은 본인 외에는 알 수 없습니다.</HeaderInfoDescription>
                </HeaderContainer>
                <CategoryRow>
                    <CategorySelect
                        onPress={() => {
                            navigation.navigate('ChangePhoneNumber')
                        }}
                    >
                        <CategoryTitle>전화번호 인증</CategoryTitle>
                    </CategorySelect>
                </CategoryRow>
                <CategoryRow>
                    <CategorySelect
                        onPress={() => {
                        }}
                    >
                        <CategoryTitle>회원탈퇴</CategoryTitle>
                    </CategorySelect>
                </CategoryRow>
            </Container>
        </SafeAreaView>
    )
}

export default Account

const Container = styled(ScrollView)``

const HeaderContainer = styled(View)`
    padding: 0 24px 24px;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.colors.description};
`

const HeaderInfoTitle = styled(TextStyles.Bold)`
    font-size: 18px;
    margin: 12px 0;
`
const HeaderInfoDescription = styled(TextStyles.Medium)`
    font-size: 14px;
    color: ${props => props.theme.colors.description};
`

const CategoryRow = styled(View)`
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.colors.description};
`

const CategorySelect = styled.TouchableOpacity`
    padding: 24px;
`

const CategoryTitle = styled(TextStyles.Medium)`
    font-size: 16px;
`