import React from 'react'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

const PreviewContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin: 12px;
`

export const PreviewSwitch = ({ navigation } : any) => {
    return (
        <PreviewContainer>
            {/* <Text>미리보기종료</Text>
            {/** @ts-ignore */}
        </PreviewContainer>
    )
}

export default PreviewSwitch
