import styled from 'styled-components/native'
import TextStyles from '../../../styled/TextStyles'

const Profile = () => {
    return (
        <Container>
            <UserImage/>
            <UserName>크리스</UserName>
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

const UserImage = styled.View`
    width: 32px;
    height: 32px;
    border-radius: 32px;
    background-color: #B4B4B444;
`

export default Profile