import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import TextStyles from '../../components/styled/TextStyles'
import { useEffect, useState } from 'react'
import { useReportPostCategories } from '../../hooks/graphql/repots'
import { ScrollView, View } from '../../components/Themed'
import { StackNavigationProp } from '@react-navigation/stack'
import { SettingsNavigatorParams } from '../../types/navigation'
import { RouteProp } from '@react-navigation/native'
import { useUserDeleteCategories } from '../../hooks/graphql/users'

export type UserDeleteCategoriy = {
    id: number,
    title: string,
}

type Props = {
    navigation: StackNavigationProp<SettingsNavigatorParams, 'Account'>,
    route: RouteProp<SettingsNavigatorParams, 'Account'>
}

const Withdrawal: React.FC<Props> = ({ navigation, route }:Props) => {
    const { post } = route.params || {}

    const { data, loading, called, error } = useUserDeleteCategories()

    const [categories, setCategories] = useState<UserDeleteCategoriy[]>([])

    useEffect(() => {
        const { userDeleteCategories } = data || {}
        if (userDeleteCategories){
            setCategories(userDeleteCategories)
        }
    }, [called, loading])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <HeaderContainer>
                    <HeaderInfoTitle>이용해주셔서 감사합니다.</HeaderInfoTitle>
                    <HeaderInfoDescription>먼저 더 좋은 경험을 드리지 못해 죄송합니다.</HeaderInfoDescription>
                    <HeaderInfoDescription>불편하셨던 사항을 알려주시면</HeaderInfoDescription>
                    <HeaderInfoDescription>개선하도록 노력하겠습니다.</HeaderInfoDescription>
                </HeaderContainer>
                {!!categories && categories.map((category, index) => (
                    <CategoryRow key={index.toString()}>
                        <CategorySelect
                            onPress={() => {
                                // navigation.navigate('ReportPost', { post, category })
                            }}
                        >
                            <CategoryTitle>{category.title}</CategoryTitle>
                        </CategorySelect>
                    </CategoryRow>
                ))}
            </Container>
        </SafeAreaView>
    )
}

export default Withdrawal

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