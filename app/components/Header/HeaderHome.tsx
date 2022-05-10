import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../types/navigation';
import { Container, DrawerMenuButton } from './styled';
import HomeIcon from '../assets/home.svg';
import JoinExitModal from '../components/Modal/JoinExitModal';

const HeaderHome: React.FC<props> = () => {

    return (
        <SafeAreaView>
            <Container>
                <DrawerMenuButton>
                    <HomeIcon width="20" height="20" color="black" />
                </DrawerMenuButton>
            </Container>
        </SafeAreaView>
    );
};

export default HeaderHome;
