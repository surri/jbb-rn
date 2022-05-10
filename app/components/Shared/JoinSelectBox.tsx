import React from 'react'
import { StyleSheet, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
// import ArrowDown from '../assets/arrow_down.svg';
import styled from 'styled-components/native'

type Placeholder = {
    label: string;
    value?: string;
}

type Item = {
    label: string;
    value: string;
}

type Props = {
    placeholder: Placeholder,
    items: Item[],
    itemKey: string | number,
    onValueChange: any;
}

const JoinSelectBox = ({ placeholder, items, itemKey, onValueChange }: Props) => {
    return (
        <Box>
            <RNPickerSelect
                placeholder={placeholder}
                items={items}
                itemKey={itemKey}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                onValueChange={onValueChange}
                doneText="완료"
                // Icon={() => <ArrowDown height="24" />}
            />
        </Box>
    )
}

export default JoinSelectBox

const Box = styled.View`
    margin: 10px 0;
`

const pickerSelectStyles = StyleSheet.create({
    placeholder: {
        color: 'black',
    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 15,
    },
})