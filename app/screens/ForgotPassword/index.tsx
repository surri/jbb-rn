import React from 'react';
import { Button } from 'react-native-paper';
import NavigationService from '../navigation/NavigationService';
import { Container } from './styeld';

const Home: React.FC = () => {
    const goBack = () => NavigationService.goBack();
    return (
        <Container>
            <Button icon="keyboard-backspace" mode="outlined" onPress={goBack}>
                Go Back
            </Button>
        </Container>
    );
};

export default Home;
