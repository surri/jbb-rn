import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
interface IProps {
    imageUrl: any;
}

interface ImageHeight {
    height: any;
}

const BannerContainer = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;
    flex-direction: column;
    margin-bottom: 32px;
`

const BannerBackgroundImage = styled.ImageBackground`
    width: 100%;
    height: ${(props: ImageHeight) => props.height}px;
`

const SafeAreaContainer = styled.SafeAreaView`
    width:100%;
    align-items: center;
    height: 400px;
`

const StickBanner: React.FC<IProps> = (props: IProps) => {
    const { imageUrl } = props

    return (
        <BannerContainer>
            <BannerBackgroundImage source={imageUrl} height={Dimensions.get('window').width}>
                <SafeAreaContainer />
            </BannerBackgroundImage>
        </BannerContainer>
    )
}

export default StickBanner