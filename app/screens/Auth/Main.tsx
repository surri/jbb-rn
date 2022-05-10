import React from 'react'
import { Container, BottomContainer } from  './styled'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import TextStyles from '../../components/styled/TextStyles'
import { useNavigation, useTheme } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthNavigatorParams } from '../../types/navigation'
import { TouchableOpacity } from '../../components/Themed'

const BottomButton = styled(TouchableOpacity)`
    flex: 1;
    align-items: center;
    border-radius: 20px;
    padding: 16px;
    border-width: 4px;
`

const BottomText = styled(TextStyles.M4214)`
    font-weight: 700;
`

const Jangbibbal = styled.View`
    flex: 9;
    justify-content: center;
    align-items: center;
`

const JangbibbalText = styled(TextStyles.M8014)`
    font-weight: 700;
`

const Main: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<AuthNavigatorParams>>()
    const theme = useTheme()

    return (
        <Container>
            <Jangbibbal>
                <MaterialIcons name="whatshot" size={80} color={theme.colors.text} />
                <JangbibbalText>JBB</JangbibbalText>
            </Jangbibbal>
            <BottomContainer>
                <BottomButton
                    onPress={() => navigation.navigate('Signup')}
                >
                    <BottomText>
                        Login
                    </BottomText>
                </BottomButton>
            </BottomContainer>
        </Container>
    )
}

export default Main
