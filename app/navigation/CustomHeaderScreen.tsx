import * as React from 'react';
import { Text, TouchableOpacity, Animated, View } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import { useCollapsibleHeader } from 'react-navigation-collapsible';


const data: number[] = [];
for (let i = 0; i < 100; i++) {
    data.push(i);
}


export const renderCustomHeader = ({
    scene,
    previous,
    navigation,
}: StackHeaderProps) => {
    const { options } = scene.descriptor;
    const title =
    options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
            ? options.title
            : scene.route.name;

    return (
        <View
            style={{
                width: '100%',
                height: 200,
                backgroundColor: 'blue',
                padding: 20,
            }}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 32,
                        color: 'white',
                        marginBottom: 10,
                    }}
                >
                    {title}
                </Text>

                {previous && (
                    <TouchableOpacity onPress={navigation.goBack}>
                        <View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: 'white',
                                }}
                            >{'<< GO BACK'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const CustomHeaderScreen = ({ navigation }) => {
    const {
        onScroll,
        containerPaddingTop,
        scrollIndicatorInsetTop,
    } = useCollapsibleHeader({
        navigationOptions: {
            header: renderCustomHeader,
        },
    });

    return (
        <Animated.FlatList
            data={data}
            onScroll={onScroll}
            contentContainerStyle={{ paddingTop: containerPaddingTop }}
            scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
            renderItem={() => (
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                    }}
                >{'<< GO fasdfasd'}
                </Text>
            )}
            keyExtractor={(item: any) => item.toString()}
        />
    );
};

export { CustomHeaderScreen };