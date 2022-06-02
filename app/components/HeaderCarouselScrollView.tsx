import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Fragment, useRef, useState } from 'react'
import { Animated, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { SearchNavigatorParams } from '../types/navigation'
import { useTheme } from '@react-navigation/native'

const HeaderCarouselScrollView = ({ images, childComponents, data, renderItem }: any) => {
    const navigation = useNavigation<StackNavigationProp<SearchNavigatorParams, 'Show'>>()
    const width = Dimensions.get('window').width
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollY = useRef(new Animated.Value(0)).current
    const theme = useTheme()

    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            listener: ({ nativeEvent: { contentOffset: { y } } }: NativeSyntheticEvent<NativeScrollEvent>) => {
                navigation.setParams({
                    scrollY: y,
                })
            },
            useNativeDriver: true,
        },
    )

    return (
        <SafeAreaProvider>
            <Animated.FlatList
                ListHeaderComponent={
                    <Fragment>
                        <Animated.View
                            style={{
                                position: 'absolute',
                                backgroundColor: theme.colors.background,
                                borderBottomWidth: 2,
                                width: '100%',
                                height: Platform.select({
                                    ios: 100,
                                    android: 84,
                                }),
                                top: 0,
                                opacity: scrollY.interpolate({
                                    inputRange: [0, 280, 300],
                                    outputRange: [0, 0, 1],
                                }),
                            }}
                        />
                        <Animated.View
                            style={{
                                flex: 1,
                                transform: [
                                    {
                                        translateY: scrollY.interpolate({
                                            inputRange: [-240, 0, 320],
                                            outputRange: [-120, 0, -300],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                    {
                                        scale: scrollY.interpolate({
                                            inputRange: [-320, 0],
                                            outputRange: [2, 1],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                ],
                                opacity: scrollY.interpolate({
                                    inputRange: [0, 300, 320],
                                    outputRange: [1, 0.8, 0],
                                }),
                            }}
                        >
                            <Carousel
                                data={images}
                                sliderWidth={width}
                                itemWidth={width}
                                itemHeight={400}
                                renderItem={({ item }: any) =>
                                    <Animated.Image
                                        source={require('../../assets/images/sample-cat.jpg') }
                                        style={{ width,height: 400 }}
                                    />
                                }
                                inactiveSlideScale={1}
                                onSnapToItem={index => setActiveIndex(index)}
                                removeClippedSubviews={false}
                            />
                            <Pagination
                                dotsLength={images.length}
                                activeDotIndex={activeIndex}
                                containerStyle={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                }}
                                dotStyle={{
                                    backgroundColor: '#000000',
                                    marginHorizontal: -4,
                                }}
                                inactiveDotStyle={{
                                    backgroundColor: '#ffffff',
                                }}
                                inactiveDotOpacity={1}
                                inactiveDotScale={1}
                            />
                            {childComponents}
                        </Animated.View>
                    </Fragment>
                }
                stickyHeaderIndices={[0]}
                data={data}
                renderItem={renderItem}
                onScroll={onScroll}
            />
        </SafeAreaProvider>
    )
}

export default HeaderCarouselScrollView