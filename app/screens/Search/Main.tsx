import React, { useEffect, useRef, useState } from 'react'
import { Animated, NativeScrollEvent, NativeSyntheticEvent, Platform, RefreshControl, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { PostsPartition } from '../../components/Card/Posts/Parts'
import PostCard, { Post } from '../../components/Card/Posts/PostCard'
import SearchBar from '../../components/Header/SearchBar'
import { LoaderPostList } from '../../components/Loader/Posts'
import { KeyboardAvoidingView, View, Text, TouchableOpacity } from '../../components/Themed'
import { usePosts } from '../../hooks/graphql/posts'
import useWait from '../../hooks/useWait'

type Props = {
    posts: Post[];
}

type Pagination<T> = {
    node: T
}

const Main: React.FC<Props> = () => {

    const [searchBarActive, setSearchBarActive] = useState(false)
    const [keyword, setKeyword] = useState('')

    const opacity = new Animated.Value(0)
    const scrollY = useRef(new Animated.Value(0)).current

    const [offsetY, setOffsetY] = useState(0)
    const [isScrollTop, setIsScrollTop] = useState(false)

    const [refreshing, setRefreshing] = useState(false)

    const wait = useWait()

    const sportsId = 2 //golf
    const { data, refetch, loading } = usePosts({ sportsId, keyword })

    const posts = data?.posts?.edges || []

    useEffect(() => {
        Animated.timing (opacity, {
            toValue: searchBarActive ? 1 : 0,
            duration: 1000,
            delay: 0,
            useNativeDriver: true,
        }).start()
    },[searchBarActive])

    const onSearch = () => {
        refetch()
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

    const onRefresh = () => {
        setRefreshing(true)
        refetch()
        wait(1000).then(() => setRefreshing(false))
    }

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
                                <Text>{keyword}</Text>
                            </SearchKeywordBox>
                        </SearchBoardContainer>
                        <SearchBoardContainer>
                            <SearchTypeBox>
                                <Text>전체검색</Text>
                            </SearchTypeBox>
                            <SearchKeywordBox
                                onPress={onSearch}
                            >
                                <Text>{keyword}</Text>
                            </SearchKeywordBox>
                        </SearchBoardContainer>
                    </SearchBoardScrollView>
                ) : (
                    <Animated.FlatList<Pagination<Post>>
                        contentContainerStyle={{ flexGrow: 1 }}
                        onScroll={onScroll}
                        scrollEventThrottle={16}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={posts}
                        // data={[]}
                        renderItem={({ item }) => <PostCard post={item} />}
                        ItemSeparatorComponent={() => <PostsPartition/>}
                        ListEmptyComponent={<LoaderPostList rows={8} />}
                    />
                )}
                <SearchBar
                    visible={isScrollTop}
                    setSearchBarActive={setSearchBarActive}
                    setSearchKeyword={setKeyword}
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

export default Main
