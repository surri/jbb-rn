import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Fragment, useRef, useState } from 'react'
import { View, Animated, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ProfileNavigatorParams } from '../../types/navigation'

const ProfileScrollView = ({ images, childComponents, data, renderItem }: any) => {
    const navigation = useNavigation<StackNavigationProp<ProfileNavigatorParams>>()
    const width = Dimensions.get('window').width
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollY = useRef(new Animated.Value(0)).current

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
            <Animated.ScrollView
                stickyHeaderIndices={[0]}
                onScroll={onScroll}
            >
                <Fragment>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            backgroundColor: '#ffffff',
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
                        <Animated.Image
                            source={require('../../../assets/images/profile-background-golf.jpg') }
                            style={{ width,height: 320, zIndex: 4 }}
                        />
                        <View style={{ zIndex: 8 }} >
                            {childComponents}
                        </View>
                    </Animated.View>
                </Fragment>
            </Animated.ScrollView>
        </SafeAreaProvider>
    )
}

export default ProfileScrollView