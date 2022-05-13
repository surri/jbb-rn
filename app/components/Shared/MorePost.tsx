import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../types/navigation'
import styled from 'styled-components/native'
import TextStyles from '../styled/TextStyles'
// import ArrowRight from '../assets/arrow_right.svg'

const MorePostButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin: 16px 0;
    height: 48px;
    border-radius: 4px;
    border-width: 0.5px;
    border-color: #dbdbdb;
`

const MorePostText = styled(TextStyles.Regular)`
`

const MorePost: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
    return (
        <MorePostButton
            // onPress={() => navigation.navigate('Main')}
        >
            <MorePostText>더보기</MorePostText>
            {/* <ArrowRight height="7" style={{ marginLeft: 18.5 }} /> */}
        </MorePostButton>
    )
}

export default MorePost