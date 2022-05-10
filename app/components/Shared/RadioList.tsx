import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import RadioButton from './RadioButton';

const RadioListContainer= styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export type IRadio = {
    value: string | boolean,
    label: string,
    selected: boolean,
}

type IProps = {
    radioList: IRadio[],
    updateRadioList: (radioList: IRadio[]) => void;
}

const RadioList: React.FC<IProps> = ({
    radioList,
    updateRadioList,
}: IProps) => {
    const [list, setList] = useState<IRadio[]>(radioList);
    const onPress = (value: string | boolean) => {
        setList(prevState => prevState.map(item => ({
            ...item, selected: item.value == value ? true : false,
        })));
    };

    useEffect(() => {
        updateRadioList(list);
    }, [list]);

    return (
        <RadioListContainer>
            {list.map(({ label, value, selected }, index) => (
                <RadioButton
                    key={index}
                    selected={selected}
                    value={value}
                    label={label}
                    onPress={() => onPress(value)}
                />
            ))}
        </RadioListContainer>
    );
};

export default RadioList;