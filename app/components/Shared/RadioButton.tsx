import React from 'react'
import styled from 'styled-components/native'
import TextStyles from '../styled/TextStyles'
import { useTheme } from '@react-navigation/native'


const RadioContainer= styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const RadioButtonWrap= styled.View`
    height: 16px;
    width: 16px;
    border-radius: 12px;
    border-width: 1px;
    border-color: ${(props: IRadioStyle) => props.color || '#000'};
    align-items: center;
    justify-content: center;
    margin-right:8px;
`

const RadioSelected= styled.View`
    height: 8px;
    width: 8px;
    border-radius: 6px;
    background-color: ${(props: IRadioStyle) => props.color || '#000'};
`
const RadioLabel= styled(TextStyles.R3814)`
    color: #333333;
`

type IRadioStyle = {
    color?: string;
}

type IProps = {
    selected: boolean;
    label: string;
    value: string | boolean;
    onPress: (value: any) => void;
}

const RadioButton: React.FC<IProps> = ({
    selected,
    label,
    value,
    onPress,
}: IProps) => {
    const theme = useTheme()
    return (
        <RadioContainer
            onPress={() => onPress(value)}
        >
            <RadioButtonWrap color={theme.colors.primary}>
                {selected && (<RadioSelected color={theme.colors.primary} />)}
            </RadioButtonWrap>
            <RadioLabel>{label}</RadioLabel>
        </RadioContainer>
    )
}

export default RadioButton