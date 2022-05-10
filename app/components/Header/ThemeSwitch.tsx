import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-native-paper';
import * as themeActions from '../store/Theme/reducer';
import { ITheme } from '../store/Theme';
import { ThemeContainer } from './styled';

interface IState {
    themeReducer: ITheme;
}

export const ThemeSwitch = () => {
    const isDark = useSelector((state: IState) => state.themeReducer.isDark);
    const dispatch = useDispatch();
    const onToggleTheme = () => dispatch(themeActions.setIsDarkTheme(!isDark));
    const iconName = isDark ? 'weather-night' : 'white-balance-sunny';
    const iconColor = isDark ? 'white' : 'black';

    return (
        <ThemeContainer>
            {/**@ts-ignore */}
            <Switch value={isDark} onValueChange={onToggleTheme} />
            <Icon name={iconName} size={20} color={iconColor} />
        </ThemeContainer>
    );
};

export default ThemeSwitch;
