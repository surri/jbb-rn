import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, NativeScrollEvent, NativeSyntheticEvent, Platform, RefreshControl, SafeAreaView } from 'react-native'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components/native'
import PostCard, { Post } from '../../components/Card/Posts/PostCard'
import SearchBar from '../../components/Posts/SearchBar'
import { LoaderPostList } from '../../components/Loader/Posts'
import { KeyboardAvoidingView, View, Text, TouchableOpacity } from '../../components/Themed'
import { usePosts } from '../../hooks/graphql/posts'
import useWait from '../../hooks/useWait'
import { selectedSportsState } from '../../recoil/selectors'
import { StackNavigationProp } from '@react-navigation/stack'
import { SearchNavigatorParams } from '../../types/navigation'
import { PostsPartition } from '../../components/Card/Posts/Parts'

type Props = {
    posts: Post[],
    navigation: StackNavigationProp<SearchNavigatorParams>,
}

type Pagination<T> = {
    node: T
}

const Main: React.FC<Props> = ({ navigation }: Props) => {

    const [searchBarActive, setSearchBarActive] = useState(false)
    const [keyword, setKeyword] = useState('')

    const opacity = new Animated.Value(0)
    const scrollY = useRef(new Animated.Value(0)).current

    const [offsetY, setOffsetY] = useState(0)
    const [isScrollTop, setIsScrollTop] = useState(false)

    const [refreshing, setRefreshing] = useState(false)

    const wait = useWait()

    const sportsId = useRecoilValue(selectedSportsState)?.id

    const { data, refetch, loading } = usePosts({ sportsId, keyword })

    const posts = data?.posts?.edges || []

    const isFocused = useIsFocused()

    useEffect(() => {
        isFocused && refetch()
    },[isFocused])

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

    const onCreate = () => {
        navigation.navigate('Create')
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
            useNativeDriver: true,
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
                    ios: 100,
                    android: 200,
                })
            }
        >
            <SafeAreaView
                style={{ flex: 1 }}
            >


                { sportsId ? searchBarActive ? (
                    <SearchBoardScrollView
                        style={{ opacity }}
                        contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <SearchBoardContainer>
                            <SearchTypeBox>
                                {/* <Text>카테고리내 검색</Text> */}
                            </SearchTypeBox>
                            <SearchKeywordBox
                                onPress={onSearchCategory}
                            >
                                <Text>{keyword}</Text>
                            </SearchKeywordBox>
                        </SearchBoardContainer>
                    </SearchBoardScrollView>
                ) : loading ? <LoaderPostList rows={8} /> : (
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
                        renderItem={({ item }) => <PostCard post={item} />}
                        ItemSeparatorComponent={() => <PostsPartition/>}
                        // ListEmptyComponent={<LoaderPostList rows={8} />}
                    />
                ) : (
                    null
                )}
                {sportsId && (
                    <SearchBar
                        visible={isScrollTop}
                        setSearchBarActive={setSearchBarActive}
                        setSearchKeyword={setKeyword}
                        onSubmit={onSearch}
                        onCreate={onCreate}
                    />
                )}
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
