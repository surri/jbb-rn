import React from 'react'
import { useTheme } from '@react-navigation/native'

// import * as loginActions from '../store/actions/loginActions';
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import styled from 'styled-components/native'
import TextStyles from '../styled/TextStyles'
import { useRecoilState } from 'recoil'
import { loginState } from '../../recoil/selectors'

interface SettingsTitle {
    color?: string;
}

interface MenuLabel {
    color?: string;
}

const SettingsContainer = styled.View`
    padding: 0 24px;
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


const DrawerMenu: React.FC<DrawerContentComponentProps> = (props: DrawerContentComponentProps) => {
    const theme = useTheme()
    const { navigation } = props

    const AuthButton = () => {
        const [isLoggedIn, setIsLoggin] = useRecoilState(loginState)

        // const user = useSelector((state: IState) => state.authReducer.user)
        const onLogin = () => setIsLoggin(true)
        const onLogout = () => setIsLoggin(false)

        const action = isLoggedIn ? onLogout : onLogin
        const label = isLoggedIn ? '로그아웃' : '로그인'

        return (
            <SettingMenu>
                <SettingMenu onPress={action}>
                    <MenuLabel color={theme.colors.text}>{label}</MenuLabel>
                </SettingMenu>
                {/* <Text>Login id : {id}</Text> */}
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
        <SettingsContainer>
            <SettingsTitle color={theme.colors.text}>설정</SettingsTitle>
            {menus.map((menu, index) => (
                <SettingMenu key={index} onPress={() => toNavigation(menu.navigation)}>
                    {index > 0 && <Partition />}
                    <MenuLabel color={theme.colors.text}>{menu.label}</MenuLabel>
                </SettingMenu>
            ))}
            <Partition />
            <AuthButton />
        </SettingsContainer>
    )
}

export default DrawerMenu
