import React from 'react';
import LogoIcon from '../assets/logo.svg';
import { LeftContainer } from './styled';

const HeaderLeft = () => {
    return (
        <LeftContainer>
            <LogoIcon width="100" height="100" />
        </LeftContainer>
    );
};

export default HeaderLeft;
