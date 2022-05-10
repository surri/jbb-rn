import React, { useEffect, useRef } from 'react'
import { useTheme } from '@react-navigation/native'
import styled from 'styled-components/native'
import { Entypo } from '@expo/vector-icons'
import { Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from '../Themed'

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
    const insets = useSafeAreaInsets()

    const offset = useRef(new Animated.Value(0)).current
    const opacity = useRef(new Animated.Value(0)).current

    const height = offset.interpolate({
        inputRange: [0, 10],
        outputRange: [0, insets.top],
        extrapolate: 'clamp',
    })

    useEffect(() => {
        Animated.parallel([
            Animated.timing(offset, {
                toValue: visible ? 10 : 0,
                duration: 400,
                useNativeDriver: false,
            }),
            Animated.timing(opacity, {
                toValue: visible ? 1 : 0,
                useNativeDriver: false,
            }),
        ]).start()
    },[visible])

    return (
        <SearchContainer>
            <SearchAnimatedContainer
                style={{
                    opacity,
                    height,
                    backgroundColor: theme.colors.background,
                }}
            >
                <SearchIcon name="magnifying-glass" size={24} color={theme.colors.text} />
                <SearchInputBox
                    onFocus={() => setSearchBarActive(true)}
                    onBlur={() => setSearchBarActive(false)}
                    color={theme.colors.text}
                    onChangeText={(value) => setSearchKeyword(value)}
                    placeholder={'Search'}
                    placeholderTextColor={theme.colors.inactive}
                    onSubmitEditing={onSubmit}
                />

            </SearchAnimatedContainer>
        </SearchContainer>
    )
}

type ITextInputStyle = {
    color?: string,
    backgroundColor?: string,
    borderColor?: string,
    containerWidth?: string,
}

const SearchContainer = styled(View)`
`

const SearchAnimatedContainer = styled(Animated.View)`
    height: 200px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 20px;
    border-color: ${(props:ITextInputStyle) => `${props.borderColor}`};
    border-width: 2px;
`

const SearchIcon = styled(Entypo)`
    padding: 10px;
`

const SearchInputBox = styled.TextInput`
    flex: 1;
    padding: 10px 10px 10px 0;
    color: ${(props:ITextInputStyle) => `${props.color}`};
    font-size: 20px;
    font-weight: bold;
    background-color: ${(props:ITextInputStyle) => `${props.backgroundColor}`};
`

export default SearchBar
