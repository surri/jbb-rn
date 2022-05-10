import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'

const Container = styled.TouchableOpacity`
    margin-left: 16px;
`

const ButtonText = styled.Text`
`

type IProps = {
    title: string;
    canGoBack: boolean
}

const NavigationBack: React.FC<IProps> = ({ title, canGoBack }: IProps) => {
    const navigation = useNavigation()
    return (
        <Container
            onPress={() => {
                canGoBack &&  navigation.goBack()
            }}
        >
            <ButtonText>backIcon {title}</ButtonText>
        </Container>
    )
}

export default NavigationBack