import React from 'react'
import styled from 'styled-components/native'
import { useTheme } from '@react-navigation/native'
import TextStyles from '../styled/TextStyles'

const PrimaryContainer = styled.View`
    justify-content: center;
    border-radius: 4px;
    width: 100%;
    margin: ${(props: IButtonStyle) => props.marginString};
    padding: 8px 2px;
    border-bottom-width: 2px;
    border-bottom-color: ${(props: IButtonStyle) => props.borderColor || '#ffffff'};
`
const PrimaryText = styled(TextStyles.M3814)`
    font-weight: bold;
`

type IButtonStyle = {
    color?: string;
    borderColor?: string;
    marginString?: string;
}

type IProps = {
    textArray: string[];
    margin?: string;
}

const ScreenInfo: React.FC<IProps> = ({
    textArray,
    margin,
}: IProps) => {
    const theme = useTheme()
    return (
        <PrimaryContainer borderColor={theme.colors.primary} marginString={margin}>
            {textArray && textArray.map((text: string, index: number) => <PrimaryText key={index}>{text}</PrimaryText>)}
        </PrimaryContainer>
    )
}

ScreenInfo.defaultProps = {
    margin: '36px 0',
}

export default ScreenInfo