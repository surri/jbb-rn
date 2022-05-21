import styled from 'styled-components/native'

const Thumbnail = () => {
    return (
        <Image source={require('../../../../../assets/images/profile-background-golf.jpg') }/>
    )
}

const Image = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 20px;
    background-color: #B4B4B444;
`


export default Thumbnail