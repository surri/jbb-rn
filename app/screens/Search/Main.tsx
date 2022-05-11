import React, { useEffect, useRef, useState } from 'react'
import { Animated, NativeScrollEvent, NativeSyntheticEvent, Platform, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import SearchBar from '../../components/Header/SearchBar'
import { KeyboardAvoidingView, View, Text, TouchableOpacity } from '../../components/Themed'


type Post = {
    id: number,
    title: string,
}

type Props = {
    posts: Post[];
}

const Main: React.FC<Props> = () => {

    const [searchBarActive, setSearchBarActive] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')

    const opacity = new Animated.Value(0)
    const scrollY = useRef(new Animated.Value(0)).current

    const [offsetY, setOffsetY] = useState(0)
    const [isScrollTop, setIsScrollTop] = useState(false)

    useEffect(() => {
        Animated.timing (opacity, {
            toValue: searchBarActive ? 1 : 0,
            duration: 1000,
            delay: 0,
            useNativeDriver: true,
        }).start()
    },[searchBarActive])

    const onSearch = () => {
        console.log('onSearch')
    }

    const onSearchCategory = () => {
        console.log('onSearchCategory')
    }

    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            listener: ({ nativeEvent: { contentOffset: { y } } }: NativeSyntheticEvent<NativeScrollEvent>) => {
                setOffsetY(y)
                setIsScrollTop(offsetY - y > 0 || y <= 0)
            },
            useNativeDriver: false,
        },
    )

    return (
        <KeyboardAvoidingView
            style={{ flexGrow: 1 }}
            keyboardVerticalOffset={
                Platform.select({
                    ios: 0,
                    android: 200,
                })
            }
        >
            <SafeAreaView
                style={{ flex: 1 }}
            >
                { searchBarActive ? (
                    <SearchBoardScrollView
                        style={{ opacity }}
                        contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <SearchBoardContainer>
                            <SearchTypeBox>
                                <Text>카테고리내 검색</Text>
                            </SearchTypeBox>
                            <SearchKeywordBox
                                onPress={onSearchCategory}
                            >
                                <Text>{searchKeyword}</Text>
                            </SearchKeywordBox>
                        </SearchBoardContainer>
                        <SearchBoardContainer>
                            <SearchTypeBox>
                                <Text>전체검색</Text>
                            </SearchTypeBox>
                            <SearchKeywordBox
                                onPress={onSearch}
                            >
                                <Text>{searchKeyword}</Text>
                            </SearchKeywordBox>
                        </SearchBoardContainer>
                    </SearchBoardScrollView>
                ) : (
                    <Animated.FlatList<Post>
                        contentContainerStyle={{ flexGrow: 1 }}
                        // ListHeaderComponent={SearchBoard}
                        // ListFooterComponent={}
                        data={DATA}
                        ListEmptyComponent={<View style={{ flex: 1 }}><Text>empty</Text></View>}
                        onScroll={onScroll}
                        scrollEventThrottle={16}
                        renderItem={({ item, index }) => (
                            <View
                                key={index.toString()}
                                style={{
                                    flex: 1,
                                    width: 100,
                                    height: 150,
                                }}
                            >
                                <Text>{item?.title}</Text>
                            </View>
                        )}
                    />
                )}
                <SearchBar
                    visible={isScrollTop}
                    setSearchBarActive={setSearchBarActive}
                    setSearchKeyword={setSearchKeyword}
                    onSubmit={onSearch}
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const SearchBoardScrollView = styled(Animated.ScrollView)`
`
const SearchBoardContainer = styled(View)`
    width: 64%;
    margin: 12px 0;
`
const SearchTypeBox = styled(View)`
`
const SearchKeywordBox = styled(TouchableOpacity)`
    border-width: 2px;
    border-radius: 12px;
    padding: 10px;
    margin-top: 8px;
`
const DATA: Post[] = [
    {
        id: 1,
        title: 'The Hunger Games',
    },
    {
        id: 2,
        title: 'Harry Potter and the Order of the Phoenix',
    },
    {
        id: 3,
        title: 'To Kill a Mockingbird',
    },
    {
        id: 4,
        title: 'Pride and Prejudice',
    },
    {
        id: 5,
        title: 'Twilight',
    },
    {
        id: 6,
        title: 'The Book Thief',
    },
    {
        id: 7,
        title: 'The Chronicles of Narnia',
    },
    {
        id: 8,
        title: 'Animal Farm',
    },
    {
        id: 9,
        title: 'Gone with the Wind',
    },
    {
        id: 10,
        title: 'The Shadow of the Wind',
    },
    {
        id: 11,
        title: 'The Fault in Our Stars',
    },
    {
        id: 12,
        title: 'The Hitchhiker\'s Guide to the Galaxy',
    },
    {
        id: 13,
        title: 'The Giving Tree',
    },
    {
        id: 14,
        title: 'Wuthering Heights',
    },
    {
        id: 15,
        title: 'The Da Vinci Code',
    },
    {
        id: 16,
        title: 'The Giving Tree',
    },
    {
        id: 17,
        title: 'Wuthering Heights',
    },
    {
        id: 18,
        title: 'The Da Vinci Code',
    },
    {
        id: 19,
        title: 'The Giving Tree',
    },
    {
        id: 20,
        title: 'Wuthering Heights',
    },
    {
        id: 21,
        title: 'The Da Vinci Code',
    },
    {
        id: 22,
        title: 'The Giving Tree',
    },
    {
        id: 23,
        title: 'Wuthering Heights',
    },
    {
        id: 24,
        title: 'The Da Vinci Code',
    },
    {
        id: 25,
        title: 'The Giving Tree',
    },
    {
        id: 26,
        title: 'Wuthering Heights',
    },
    {
        id: 27,
        title: 'The Da Vinci Code',
    },
    {
        id: 28,
        title: 'The Giving Tree',
    },
    {
        id: 29,
        title: 'Wuthering Heights',
    },
    {
        id: 30,
        title: 'The Da Vinci Code',
    },
    {
        id: 31,
        title: 'The Giving Tree',
    },
    {
        id: 32,
        title: 'Wuthering Heights',
    },
    {
        id: 33,
        title: 'The Da Vinci Code',
    },
    {
        id: 34,
        title: 'The Giving Tree',
    },
    {
        id: 35,
        title: 'Wuthering Heights',
    },
    {
        id: 36,
        title: 'The Da Vinci Code',
    },
    {
        id: 37,
        title: 'The Giving Tree',
    },
    {
        id: 38,
        title: 'Wuthering Heights',
    },
    {
        id: 39,
        title: 'The Da Vinci Code',
    },
    {
        id: 40,
        title: 'The Giving Tree',
    },
    {
        id: 41,
        title: 'Wuthering Heights',
    },
    {
        id: 42,
        title: 'The Da Vinci Code',
    },
]

export default Main
