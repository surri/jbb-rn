
import { CompositeNavigationProp, CompositeScreenProps } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Post } from '../components/Card/Posts/PostCard'

export type DrawerNavigatorParams = {
    RootNavigator: RootStackParams;
}

export type RootStackParams = {
    Root: NavigatorScreenParams<TabNavigatorParams> | undefined;
    NotFound: undefined;
    Settings: SettingsNavigatorParams;
    SettingsDetail: ISettings;
    Modal: undefined;
};

export type TabNavigatorParams = {
    Home: HomeNavigatorParams;
    Search: SearchNavigatorParams;
    Create: undefined;
    Settings: SettingsNavigatorParams;
}

export type HomeNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabNavigatorParams, 'Home'>,
StackNavigationProp<RootStackParams>
>;

export type SearchNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabNavigatorParams, 'Search'>,
StackNavigationProp<RootStackParams>
>;

export type CreateNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabNavigatorParams, 'Create'>,
StackNavigationProp<RootStackParams>
>;

export type SettingsNavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<TabNavigatorParams, 'Settings'>,
StackNavigationProp<RootStackParams>
>;

export type RootTabScreenProps<Screen extends keyof TabNavigatorParams> = CompositeScreenProps<
BottomTabScreenProps<TabNavigatorParams, Screen>,
NativeStackScreenProps<RootStackParams>
>;

export type HomeNavigatorParams = {
    Main: {},
}

export type SettingsNavigatorParams = {
    Main: {},
}

export type SearchNavigatorParams = {
    Main: {},
    Show: {
        post: Post
    },
}

export type CreateNavigatorParams = {
    Category: undefined
    Create: undefined
}

export type  AuthNavigatorParams = {
    Main: {},
    Login: {},
    ForgotPassword: {},
    Signup: undefined,
    Confirm: {
        phone: string
    }
}