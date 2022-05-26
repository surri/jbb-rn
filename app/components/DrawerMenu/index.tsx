import React from 'react'
import { useTheme } from '@react-navigation/native'

// import * as loginActions from '../store/actions/loginActions';
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import styled from 'styled-components/native'
import TextStyles from '../styled/TextStyles'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isDarkState, loginState, userState } from '../../recoil/selectors'
import { View } from '../Themed'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface SettingsTitle {
    color?: string;
}

interface MenuLabel {
    color?: string;
}


const DrawerMenu: React.FC<DrawerContentComponentProps> = (props: DrawerContentComponentProps) => {
    const theme = useTheme()
    const { navigation } = props

    const AuthButton = () => {
        const [isLoggedIn, setIsLoggin] = useRecoilState(loginState)
        const setUser = useSetRecoilState(userState)

        const onLogin = () => setIsLoggin(true)
        const onLogout = async () => {
            setUser(null)
            setIsLoggin(false)
            await AsyncStorage.removeItem('user')

            const aa = await AsyncStorage.getAllKeys()

            console.log(aa)

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
        const label = isDark ? '라이트모드' : '다크모드'

        return (
            <SettingMenu>
                <SettingMenu onPress={action}>
                    <MenuLabel color={theme.colors.text}>{label}</MenuLabel>
                </SettingMenu>
            </SettingMenu>
        )
    }

    const menus = [
        { label: '계정관리', navigation: 'Account'  },
        { label: '알림설정', navigation: 'Notifications'  },
    ]

    const toNavigation = (name: string) => {
        navigation.navigate(name)
    }

    return (
        <Container>
            {menus.map((menu, index) => (
                <SettingMenu key={index} onPress={() => toNavigation(menu.navigation)}>
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
