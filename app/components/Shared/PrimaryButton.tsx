import React from 'react'
import styled from 'styled-components/native'
import { useTheme } from '@react-navigation/native'
import TextStyles from '../styled/TextStyles'
import { TouchableOpacity } from '../Themed'

const PrimaryTouchable = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: 100%;
    padding: 16px 0 18px;
    margin: 32px 0;
    border-width: 4px;
    border-color: ${(props: IButtonStyle) => props.borderColor};
`
const PrimaryText = styled(TextStyles.Bold)`
    font-size: 20px;
    opacity: 0.4;
    opacity: ${(props: IButtonStyle) => props.opacity};
`

type IButtonStyle = {
    color?: string;
    backgroundColor?: string;
    opacity?: number;
    borderColor?: string;
}

type IProps = {
    text: string;
    onPress: () => void;
    active?: boolean;
}

const PrimaryButton: React.FC<IProps> = ({
    onPress,
    text,
    active,
}: IProps) => {
    const theme = useTheme()

    return (
        <PrimaryTouchable onPress={onPress}  borderColor={active ? theme.colors.border : theme.colors.inactive} >
            <PrimaryText color={theme.colors.background} opacity={active ? 1 : 0.2}>{text}</PrimaryText>
        </PrimaryTouchable>
    )
}

PrimaryButton.defaultProps = {
    active: true,
}

export default PrimaryButton