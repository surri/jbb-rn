import React from 'react'
import styled from 'styled-components/native'
import { TextInputProps } from 'react-native'
import { View } from '../Themed'
import { useTheme } from '@react-navigation/native'


const PrimaryTextInputContainer = styled(View)`
    width: ${(props:ITextInputStyle) => `${props.containerWidth}`};
    margin: 12px 0;
`

const InputText = styled.TextInput`
    color: ${(props:ITextInputStyle) => `${props.color}`};
    font-size: 20px;
    font-weight: bold;
    background-color: ${(props:ITextInputStyle) => `${props.backgroundColor}`};
    border-color: ${(props:ITextInputStyle) => `${props.borderColor}`};
    border-width: 2px;
    border-radius: 4px;
    padding: 12px 18px;
`

type ITextInputStyle = {
    color?: string,
    backgroundColor?: string,
    borderColor?: string,
    containerWidth?: string,
}

type IProps = TextInputProps & {
    label?: string,
    require?: boolean,
    width?: string,
}

const ConfirmInput: React.FC<IProps> = ({
    autoFocus,
    onBlur,
    maxLength,
    onChangeText,
    value,
    placeholder,
}: IProps) => {
    const theme = useTheme()
    return (
        <PrimaryTextInputContainer>
            <InputText
                autoFocus={autoFocus}
                color={theme.colors.text}
                maxLength={maxLength}
                backgroundColor={theme.colors.background}
                borderColor={theme.colors.border}
                keyboardType={'number-pad'}
                onBlur={onBlur}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.inactive}
            />
        </PrimaryTextInputContainer>
    )
}

ConfirmInput.defaultProps = {
    label: '',
    width: '100%',
    require: false,
}

export default ConfirmInput