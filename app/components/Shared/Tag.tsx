import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

type ITag = {
    name: string;
        //     '접수대기' | '접수중' | '진행전' | '진행중' | '대회중' | '종료' | '공식기록' | '즉시결제' |
        //   '영업중' | '영업종료' | '대관예약' | '레슨예약'; // | '팔아요' | '결제가능';
}

const Tag: React.FC<ITag> = ({
    name,
}: ITag) => {
    const theme = useTheme();
    const labelStyle = ()  => {
        const commonStyle = {
            alignSelf: 'flex-start',
            fontSize: 10,
            paddingHorizontal: 8,
            marginRight: 8,
            lineHeight: 24,
            borderRadius: 4,
            borderWidth: 1,
            overflow: 'hidden',
        };
        let returnObj: any = {
            '접수중': [ commonStyle, {
                color: theme.colors.card,
                backgroundColor: theme.colors.primary,
                borderColor: 'transparent',
            }],
            '공식기록': [ commonStyle, {
                // @ts-ignore
                color: theme.colors.pink,
                backgroundColor: theme.colors.background,
                // @ts-ignore
                borderColor: theme.colors.pink,
            }],
            '즉시결제': [ commonStyle, {
                color: theme.colors.primary,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.primary,
            }],
            '접수대기': [ commonStyle, {
                color: theme.colors.text,
                // @ts-ignore
                backgroundColor: theme.colors.gray,
                borderColor: 'transparent',
            }],
            '대회중': [ commonStyle, {
                color: theme.colors.card,
                // @ts-ignore
                backgroundColor: theme.colors.pink,
                borderColor: 'transparent',
            }],
            '영업중': [ commonStyle, {
                color: theme.colors.primary,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.primary,
            }],
            '영업종료': [ commonStyle, {
                // @ts-ignore
                color: '#999',
                backgroundColor: theme.colors.background,
                // @ts-ignore
                borderColor: theme.colors.gray,
            }],
            '레슨예약': [ commonStyle, {
                color: theme.colors.card,
                // @ts-ignore
                backgroundColor: theme.colors.pink,
                borderColor: 'transparent',
            }],
            '대관예약': [ commonStyle, {
                color: theme.colors.card,
                backgroundColor: theme.colors.primary,
                borderColor: 'transparent',
            }],
        };
        return returnObj[name];
    };

    return (
        <Text style={labelStyle()}>{name}</Text>
    );
};

export default Tag;