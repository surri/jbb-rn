import React, { useEffect, useRef } from 'react'
import { useTheme } from '@react-navigation/native'
import styled from 'styled-components/native'
import { Entypo } from '@expo/vector-icons'
import { Animated, Easing } from 'react-native'

interface ISearchBar {
    setSearchBarActive:(active: boolean) => void;
    setSearchKeyword:(keyword: string) => void;
    onSubmit:() => void;
    visible: boolean;
}

const SearchBar: React.FC<ISearchBar> = ({
    setSearchBarActive,
    setSearchKeyword,
    onSubmit,
    visible,
}: ISearchBar) => {
    const theme = useTheme()

    const translateY = useRef(new Animated.Value(0)).current
    const opacity = useRef(new Animated.Value(0)).current
    const easeOutBounce = (x: number): number => {
        const n1 = 7.5625
        const d1 = 2.75

        if (x < 1 / d1) {
            return n1 * x * x
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375
        }
    }
    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: visible ?  0: 200,
                duration: 400,
                easing: easeOutBounce,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: visible ? 1 : 0,
                useNativeDriver: true,
            }),
        ]).start()
    },[visible])

    return (
        <SearchAnimatedContainer
            style={{
                opacity,
                transform: [{ translateY }],
                borderColor: theme.colors.text,
                backgroundColor: theme.colors.background,
                margin: 12,
            }}
        >
            <SearchIcon name="magnifying-glass" size={24} color={theme.colors.text} />
            <SearchInputBox
                onFocus={() => setSearchBarActive(true)}
                onBlur={() => setSearchBarActive(false)}
                color={theme.colors.text}
                onChangeText={(value) => setSearchKeyword(value)}
                placeholder={'Search'}
                placeholderTextColor={theme.colors.placeHolder}
                onSubmitEditing={onSubmit}
            />

        </SearchAnimatedContainer>
    )
}

type ITextInputStyle = {
    color?: string,
    backgroundColor?: string,
    borderColor?: string,
    containerWidth?: string,
}

const SearchAnimatedContainer = styled(Animated.View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 20px;
    /* border-color: ${(props:ITextInputStyle) => `${props.borderColor}`}; */
    border-width: 2px;
`

const SearchIcon = styled(Entypo)`
    padding: 10px;
`

const SearchInputBox = styled.TextInput`
    flex: 1;
    padding: 10px 10px 10px 0;
    color: ${(props:ITextInputStyle) => `${props.color}`};
    font-weight: bold;
`

export default SearchBar
