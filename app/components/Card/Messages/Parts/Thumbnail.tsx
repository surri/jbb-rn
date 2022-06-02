import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'


const Thumbnail = ({ url }: any) => {
    const theme = useTheme()
    return url ? (
        <Image source={require('../../../../../assets/images/profile-background-golf.jpg') }/>
    ) : (
        <EmptyProfileImage>
            <FontAwesome name="user" size={40} color={theme.colors.inactive} />
        </EmptyProfileImage>
    )
}

const Image = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #B4B4B444;
`

const EmptyProfileImage = styled.View`
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: 3px solid ${props => props.theme.colors.inactive}
`

export default Thumbnail