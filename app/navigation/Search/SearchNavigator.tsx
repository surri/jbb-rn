import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { RouteProp, useNavigation, useTheme } from '@react-navigation/native'
import { RootStackParams, SearchNavigatorParams } from '../../types/navigation'
import { Create, Edit, Main, Show } from '../../screens/Search'
import { ActionSheetIOS, Pressable, TouchableOpacity, View } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { Text } from '../../components/Themed'
import { useRecoilValue } from 'recoil'
import { selectedSportsState } from '../../recoil/selectors'
import { useActionSheet } from '@expo/react-native-action-sheet'
import useDeletePost from '../../hooks/graphql/posts/useDeletePost'
import { Post } from '../../components/Card/Posts/PostCard'

const SettingsStack = createStackNavigator<SearchNavigatorParams>()


type Props = {
    navigation: StackNavigationProp<SearchNavigatorParams>,
    route: RouteProp<SearchNavigatorParams>,
}

const SearchNavigator: React.FC<Props> = ({ navigation, route }: Props) => {
    const theme = useTheme()

    const selectedSports = useRecoilValue(selectedSportsState)

    const rootNavigation = useNavigation<StackNavigationProp<RootStackParams>>()

    const { showActionSheetWithOptions } = useActionSheet()
    const [deletePost, { data, loading, error }] = useDeletePost()

    const onPostMenu = (post: Post) => {
        const { mine } = post
        return mine ? onEditPostMenu(post) : onReportPostMenu(post)
    }

    const onReportPostMenu = (post: Post) => ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ['닫기', '신고하기', '차단하기'],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0,
            userInterfaceStyle: theme.dark ? 'dark' : 'light',
        },
        async buttonIndex => {
            if (buttonIndex === 1) {
                rootNavigation.navigate('ReportsNavigator', { screen: 'Category', post })
            } else if (buttonIndex === 2) {
                //todo blind
            }
        },
    )

    const onEditPostMenu = (post: Post) => ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ['닫기', '수정', '삭제'],
            destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
            userInterfaceStyle: theme.dark ? 'dark' : 'light',
        },
        async buttonIndex => {
            if (buttonIndex === 1) {
                navigation.navigate('Edit', { post })
            } else if (buttonIndex === 2) {
                try {
                    await deletePost({
                        variables: { id: Number(post.id) },
                    }).then(({ data }) => {
                        if (data.deletePost) {
                            navigation.goBack()
                        }
                    }).catch(err =>console.log(JSON.stringify(err),'err'))
                } catch (e) {
                    console.log(e,'e')
                }
            }
        },
    )
    const HeaderTitle = ({ navigation, isShowHeader }: any) => {
        const headerColor = theme.dark || (isShowHeader || isShowHeader == undefined) ? theme.colors.text : theme.colors.background

        return (
            <Pressable
                onPress={() => navigation.navigate('Modal')}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}>
                <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: headerColor,
                    }} >
                        {selectedSports?.nameKR ? selectedSports?.nameKR : '취미를 선택해주세요'}
                    </Text>
                    <FontAwesome
                        name="chevron-down"
                        size={16}
                        color={headerColor}
                        style={{ marginLeft: 4 }}
                    />
                </View>
            </Pressable>
        )
    }

    return (
        <SettingsStack.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    shadowColor: 'transparent',
                    backgroundColor: theme.colors.background,
                },
                headerTitle: () => <HeaderTitle navigation={navigation} />,
                gestureResponseDistance: 400,
            })}
        >
            <SettingsStack.Screen name="Main" component={Main} />
            <SettingsStack.Screen
                name="Create"
                component={Create}
            />
            <SettingsStack.Screen
                name="Edit"
                component={Edit}
            />
            <SettingsStack.Screen
                name="Show"
                component={Show}
                options={({ navigation, route }: any) => {
                    const isShowHeader = route?.params?.scrollY > 280
                    const headerTintColor = theme.dark || isShowHeader ? theme.colors.text : theme.colors.background
                    return {
                        headerTransparent: true,
                        headerTintColor,
                        headerTitle: () => <HeaderTitle navigation={navigation} isShowHeader={isShowHeader}/>,
                        headerRight: () => (
                            <TouchableOpacity
                                style={{ marginHorizontal: 12 }}
                                onPress={() => onPostMenu(route.params?.post)}
                            >
                                <Entypo name="dots-three-horizontal" size={24} color={headerTintColor} />
                            </TouchableOpacity>
                        ),
                    }}
                }
            />
        </SettingsStack.Navigator>
    )
}

export default SearchNavigator