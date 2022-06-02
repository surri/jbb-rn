import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'

// import * as loginActions from '../store/actions/loginActions';
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import styled from 'styled-components/native'
import TextStyles from '../styled/TextStyles'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isDarkState, loginState, userState } from '../../recoil/selectors'
import { View } from '../Themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Switch } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../types/navigation'

interface SettingsTitle {
    color?: string;
}

interface MenuLabel {
    color?: string;
}


const DrawerMenu: React.FC<DrawerContentComponentProps> = () => {
    const theme = useTheme()
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

    const AuthButton = () => {
        const [isLoggedIn, setIsLoggin] = useRecoilState(loginState)
        const setUser = useSetRecoilState(userState)

        const onLogin = () => setIsLoggin(true)
        const onLogout = async () => {
            setUser(null)
            setIsLoggin(false)
            await AsyncStorage.removeItem('user')
        }

        const action = isLoggedIn ? onLogout : onLogin
        const label = isLoggedIn ? '로그아웃' : '로그인'

        return (
            <SettingMenu>
                <SettingMenu onPress={action}>
                    <MenuLabel color={theme.colors.text}>{label}</MenuLabel>
                </SettingMenu>
            </SettingMenu>
        )
    }
    const ThemeButton = () => {
        const [isDark, setIsDark] = useRecoilState(isDarkState)

        const setDark = () => setIsDark(true)
        const setLight = () => setIsDark(false)

        const action = isDark ? setLight : setDark

        return (
            <SettingMenu>
                <Switch
                    trackColor={{ false: theme.colors.inactive, true: theme.colors.active }}
                    thumbColor='#ffffff'
                    ios_backgroundColor={theme.colors.inactive}
                    onValueChange={action}
                    value={isDark}
                />
            </SettingMenu>
        )
    }

    const menus = [
        { label: '알림설정', screen: 'Notification'  },
        { label: '정보변경', screen: 'Account'  },
        { label: '계정삭제', screen: 'Withdrawal'  },
    ]

    const toNavigation = (screen: string) => {
        navigation.navigate('SettingsNavigator', { screen } )
    }

    return (
        <Container>
            {menus.map((menu, index) => (
                <SettingMenu key={index} onPress={() => toNavigation(menu.screen)}>
                    {index > 0 && <Partition />}
                    <MenuLabel color={theme.colors.text}>{menu.label}</MenuLabel>
                </SettingMenu>
            ))}
            <Partition />
            <AuthButton />
            <Partition />
            <ThemeButton />
        </Container>
    )
}


const Container = styled(View)`
    padding: 40px 24px;
    flex: 1;
    justify-content: flex-end;
`

const SettingsTitle = styled(TextStyles.Regular)`
    color: ${(props: SettingsTitle) => props.color || '#000'};
    padding: 32px 0;
`

const SettingMenu = styled.TouchableOpacity`
`

const MenuLabel = styled(TextStyles.Regular)`
    color: ${(props: MenuLabel) => props.color || '#000'};
`

const Partition = styled.View`
    margin: 24px 0;
    height: 0.5px;
    background-color: #ccc;
`
export default DrawerMenu
