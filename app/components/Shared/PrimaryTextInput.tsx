import React from 'react'
import styled from 'styled-components/native'
import { TextInputProps } from 'react-native'
import { useTheme } from '@react-navigation/native'

const InputText = styled.TextInput`
    color: ${(props:ITextInputStyle) => `${props.color}`};
    font-weight: bold;
    background-color: ${(props:ITextInputStyle) => `${props.backgroundColor}`};
    border-color: ${(props:ITextInputStyle) => `${props.borderColor}`};
    border-width: 1px;
    border-radius: 4px;
    padding: 12px 8px;
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

const PrimaryTextInput: React.FC<IProps> = ({
    onBlur,
    onChangeText,
    value,
    placeholder,
    placeholderTextColor,
}: IProps) => {
    const theme = useTheme()
    return (
        <InputText
            color={theme.colors.text}
            backgroundColor={theme.colors.background}
            borderColor={theme.colors.border}
            keyboardType={'phone-pad'}
            onBlur={onBlur}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
        />
    )
}

PrimaryTextInput.defaultProps = {
    label: '',
    width: '100%',
    require: false,
}

export default PrimaryTextInput