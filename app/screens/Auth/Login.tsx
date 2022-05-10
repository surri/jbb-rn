import React from 'react'
import NavigationService from '../../navigation/NavigationService'

import { Container, BottomContainer } from  './styled'
import styled from 'styled-components/native'


const BottomButton = styled.TouchableOpacity`
`

const BottomText = styled.Text`
`


const Main: React.FC = () => {
    const onForgot = () => NavigationService.navigate('ForgotPassword')

    return (
        <Container>
            <BottomContainer>
                <BottomButton>
                    <BottomText>
                        둘러보기
                    </BottomText>
                </BottomButton>

                <BottomButton>
                    <BottomText>
                        회원가입
                    </BottomText>
                </BottomButton>
                <BottomButton>
                    <BottomText>
                        로그인
                    </BottomText>
                </BottomButton>
            </BottomContainer>
        </Container>
    )
}

export default Main
