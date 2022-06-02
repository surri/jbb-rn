import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import styled from 'styled-components/native'
import { RootStackParams } from '../../../../types/navigation'
import TextStyles from '../../../styled/TextStyles'

type Props = {
    user: {
        userId: number,
        author: string,
    },
    size?: 'xs' | 'sm'
}

const UserCard = ({ user, size }: Props) => {
    const { userId, author } = user || {}

    console.log('UserCard', user)
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
    return (
        <Container
            onPress={() => navigation.navigate('UserProfile', { userId })}
        >
            <UserImage width={size == 'sm' ? 40 : 32} source={require('../../../../../assets/images/sample-place.png') }/>
            <UserName fontSize={size == 'sm' ? 16 : 12}>{author}</UserName>
        </Container>
    )
}
const Container = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`

const UserName = styled(TextStyles.Regular)`
    font-size: ${(props: {fontSize: number}) => props.fontSize}px;
    margin: 0 8px;
`

const UserImage = styled.Image`
    width: ${props => props.width}px;
    height: ${props => props.width}px;
    border-radius: ${props => props.width}px;
    background-color: #B4B4B444;
`

export default UserCard