import React, { useRef }from 'react'
import { View, SafeAreaView, Animated } from 'react-native'
import { SearchContainer, SearchInputBox } from './styled'
import { useTheme } from '@react-navigation/native'
import SearchIcon from '../assets/search_button.svg'
import { Container, DrawerMenuButton, MyPageIcon } from './styled'

interface ISearchBar {
    visible: boolean;
}

const SearchBar: React.FC<ISearchBar> = ({
    visible,
}: ISearchBar) => {
    const theme = useTheme()
    const onChangeText = () => {
        console.log('onChange')
    }

    const position: any = useRef(new Animated.Value(0)).current
    const translateY = position.interpolate({
        inputRange: [0, 200],
        outputRange: [0, -200],
        extrapolate: 'clamp',
    })

    return (
        <>
            <Animated.View
                style={[
                    { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, backgroundColor: 'red' },
                    { transform: [{ translateY }] },
                ]}
            >
            </Animated.View>
            <SearchContainer visible={visible}>
                <SearchInputBox
                    borderColor={theme.colors.primary}
                    onChangeText={onChangeText}
                />
            </SearchContainer>
        </>
    )
}

export default SearchBar
