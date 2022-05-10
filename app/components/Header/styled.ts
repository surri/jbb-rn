import styled from 'styled-components/native'
import { Animated, Dimensions } from 'react-native'

interface ScreenName {
    color?: string;
}

interface CircleButton {
    color?: string;
    size?: number;
}

interface MyPageIcon {
    backgroundColor?: string;
}

export const LeftContainer = styled.View`
    padding: 38px 32px;
    justify-content: center;
    align-items: center;
`

export const Container = styled.View`
    flex-direction: row;
    justify-content: flex-end;
`

export const ScreenName = styled.Text`
    font-size: 14px;
    color: ${(props: ScreenName) => props.color || '#000'};
`

export const ThemeContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin: 12px;
`

export const DrawerMenuButton = styled.TouchableOpacity`
    color: #000;
    padding-left: 18px;
    justify-content: center;
    align-items: center;
`

export const CircleButton = styled.TouchableOpacity`
    color: ${(props: CircleButton) => props.color || '#000'};
    width: ${(props: CircleButton) => props.size || 24}px;
    height: ${(props: CircleButton) => props.size || 24}px;
`

//inputbox
export const SafeAreaContainer = styled.SafeAreaView`
`


export const MyPageIcon = styled.View`
    width:20px;
    height:20px;
    border-radius: 10px;
    background-color: ${(props: MyPageIcon) => props.backgroundColor || '#000'};
`
export default styled
