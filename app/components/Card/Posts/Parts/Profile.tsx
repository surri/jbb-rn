import styled from 'styled-components/native'
import TextStyles from '../../../styled/TextStyles'

type Profile = {
    name: string,
}

const Profile = ({ name }: Profile) => {
    return (
        <Container>
            <UserImage source={require('../../../../../assets/images/sample-place.png') }/>
            <UserName>{name}</UserName>
        </Container>
    )
}
const Container = styled.View`
    flex-direction: row;
    align-items: center;
`

const UserName = styled(TextStyles.Regular)`
    margin: 0 8px;
`

const UserImage = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 32px;
    background-color: #B4B4B444;
`

export default Profile