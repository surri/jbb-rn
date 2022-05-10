import React from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../types/navigation'
import { useTheme } from '@react-navigation/native'
import { Container, DrawerMenuButton, MyPageIcon } from './styled'
// import MenuIcon from '../assets/menu_button.svg'
// import SearchIcon from '../assets/search_button.svg'
// import SearchBar from '../components/Header/SearchBar';

interface IProps {
    inversion: boolean;
}

const openMenu = (navigation: any) => {
    navigation.toggleDrawer()
}

const openSearchBar = () => {
    //Todo
    console.log('searchBar')
}

const HeaderRight: React.FC<IProps> = ({
    inversion,
}: IProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
    const theme = useTheme()
    const iconColor = inversion ? theme.colors.background : theme.colors.text

    return (
        <SafeAreaView>
            <Container>
                <DrawerMenuButton onPress={openSearchBar}>
                    {/* <SearchIcon width="24" height="24" stroke={iconColor}  /> */}
                </DrawerMenuButton>
                <DrawerMenuButton onPress={() => navigation.navigate('Player')}>
                    <MyPageIcon backgroundColor={iconColor} />
                </DrawerMenuButton>
                <DrawerMenuButton onPress={() => openMenu(navigation)}>
                    {/* <MenuIcon width="24" height="24" stroke={iconColor} /> */}
                </DrawerMenuButton>
            </Container>
        </SafeAreaView>
    )
}

export default HeaderRight
