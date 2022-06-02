import React, { useEffect, useRef } from 'react'
import { useTheme } from '@react-navigation/native'
import styled from 'styled-components/native'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { Animated } from 'react-native'
import { TouchableOpacity, View } from '../Themed'

interface ISearchBar {
    setSearchBarActive:(active: boolean) => void;
    setSearchKeyword:(keyword: string) => void;
    onSubmit:() => void;
    onCreate:() => void;
    visible: boolean;
}

const SearchBar: React.FC<ISearchBar> = ({
    setSearchBarActive,
    setSearchKeyword,
    onSubmit,
    onCreate,
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
                margin: 12,
            }}
        >
            <SearchContainer
                style={{
                    borderColor: theme.colors.active,
                    backgroundColor: theme.colors.background,
                }}
            >
                <SearchIcon name="magnifying-glass" size={24} color={theme.colors.active} />
                <SearchInputBox
                    onFocus={() => setSearchBarActive(true)}
                    onBlur={() => setSearchBarActive(false)}
                    onChangeText={(value) => setSearchKeyword(value)}
                    placeholder={'Search'}
                    placeholderTextColor={theme.colors.placeHolder}
                    onSubmitEditing={onSubmit}
                />
            </SearchContainer>
            <CreatePostContainer onPress={onCreate}>
                <AntDesign
                    name="pluscircleo"
                    size={40}
                    color={theme.colors.active}
                    style={{
                        backgroundColor: theme.colors.background,
                        overflow: 'hidden',
                    }}
                />
            </CreatePostContainer>
        </SearchAnimatedContainer>
    )
}

const SearchAnimatedContainer = styled(Animated.View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`

const SearchContainer= styled(View)`
    flex: 1;
    flex-direction: row;
    border-radius: 20px;
    border-width: 2px;
`

const CreatePostContainer= styled(TouchableOpacity)`
    border: 0;
    margin: 12px;
`

const SearchIcon = styled(Entypo)`
    padding: 8px 4px 8px 10px;
`

const SearchInputBox = styled.TextInput`
    flex: 1;
    padding: 6px 6px 6px 0;
    color: ${props => props.theme.colors.text};
    font-weight: bold;
`

export default SearchBar
