import React from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

type TabButtonStyle = {
    isFocused: boolean;
}

const TabButton = styled.TouchableOpacity`
    margin: 1px 20px;
    padding: 8px 4px;
    border-bottom-width: ${(props: TabButtonStyle) => props.isFocused ? '4px' : '0px'};
    border-bottom-color: ${(props: TabButtonStyle) => props.isFocused ? '#fdfbd7' : '#ffffff'};
`

const TabText = styled(Animated.Text)`
    color: #fdfbd7;
    font-size: 13px;
    font-family: NotoSansKR-Medium;
    letter-spacing: -0.38px;
`

const TabContainer = styled.View`
    flex-direction: row;
    background: #4ecdc4;
`

function SportsTabBar({ state, descriptors, navigation, position } : any) {
    return (
        <TabContainer>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key]
                const label = options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                        ? options.title
                        : route.name

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true })
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    })
                }

                return (
                    <TabButton
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                    >
                        <TabText>
                            {label}
                        </TabText>
                    </TabButton>
                )
            })}
        </TabContainer>
    )
}

export default SportsTabBar