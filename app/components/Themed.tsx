/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
    Text as DefaultText,
    View as DefaultView,
    ScrollView as DefaultScrollView,
    TouchableOpacity as DefaultTouchableOpacity,
    KeyboardAvoidingView as DefaultKeyboardAvoidingView,
    Platform,
} from 'react-native'

import Colors from '../theme'
import { useTheme } from '@react-navigation/native'

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
    const theme = useTheme().dark ? 'dark': 'light'

    const colorFromProps = props[theme]

    if (colorFromProps) {
        return colorFromProps
    } else {
        return Colors[theme][colorName]
    }
}

type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type TouchableOpacityProps = ThemeProps & DefaultTouchableOpacity['props'];
export type KeyboardAvoidingViewProps = ThemeProps & DefaultKeyboardAvoidingView['props'];

export function Text(props: TextProps) {
    const { style, lightColor, darkColor, ...otherProps } = props
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
    return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function View(props: ViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function ScrollView(props: ScrollViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

    return <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function TouchableOpacity(props: TouchableOpacityProps) {
    const { style, lightColor, darkColor, ...otherProps } = props
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border')

    return <DefaultTouchableOpacity style={[{ borderColor, borderWidth: 1 }, style]} {...otherProps} />
}
export function KeyboardAvoidingView(props: KeyboardAvoidingViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

    return <DefaultKeyboardAvoidingView
        style={[{ backgroundColor }, style]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        {...otherProps}
    />
}


