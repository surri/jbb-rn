import React from 'react';
import WebView from 'react-native-webview';
import { StyleProp, ViewStyle } from 'react-native';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

type Props = {
    onLoad: () => any;
    onMessage?: (event: WebViewMessageEvent) => any;
    style?: StyleProp<ViewStyle>;
};


const Map = React.forwardRef<WebView, Props>((
    { onLoad, onMessage, style }: Props,
    ref,
) => {
    return (
        <WebView
            ref={ref}
            source={{ uri: 'https://dev-m.chilten.com/webview/daummap' }}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            style={[{ opacity: 0.99, minHeight: 1 }, style]}
            onLoad={onLoad}
            onMessage={onMessage}
        />
    );
});

Map.defaultProps = {
    onMessage: undefined,
    style: undefined,
};

export default Map;