import React from 'react';
import { View } from 'react-native';
import ArrowDown from '../assets/arrow_down.svg';
import RNPickerSelect from 'react-native-picker-select';

type PickerData = {
    label: string,
    value: any,
}

type Picker = {
    title: string,
    data: PickerData[],
}

interface IProps {
    data: Picker[];
}

const FilterDropBox: React.FC<IProps> = ({
    data,
}: IProps) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                paddingVertical: 32,
                paddingHorizontal: 24,
            }}
        >
            {data.map((item: any, index: any) => (
                <RNPickerSelect
                    key={index}
                    value={item.title}
                    onValueChange={(value) => console.log(value)}
                    items={item.data}
                    doneText="완료"
                    placeholder={{
                        label: item.title,
                    }}
                    style={{
                        placeholder: {
                            fontFamily: 'NotoSansKR-Regular',
                            fontSize: 12,
                            color: '#333333',
                        },
                        inputIOS: {
                            backgroundColor: 'white',
                        },
                        inputAndroid: {
                            backgroundColor: 'white',
                        },
                        viewContainer: {
                            flex: 1,
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: '#f5f5f5',
                            padding: 11.5,
                            marginLeft: index > 0 ? 10 : 0,
                        },
                    }}
                    Icon={() => <ArrowDown height="24" />}
                />
            ))}
        </View>
    );
};

export default FilterDropBox;