import React from 'react'
import HeaderCarouselScrollView from '../../components/HeaderCarouselScrollView'
import { Text, View } from '../../components/Themed'


const Show = () => {
    const renderItem = ({ item }: any) => (
        <View style={{ margin: 32 }} >
            <Text style={{ fontSize: 32 }}>{item.title}</Text>
        </View>
    )

    const images = [0,1,2]
    return (
        <HeaderCarouselScrollView
            images={images}
            data={DATA}
            renderItem={renderItem}
        />
    )
}
const DATA = [
    {
        id: 1,
        title: '111111111111111111111111111111111111111111',
    },
    {
        id: 2,
        title: '222222222222222222222222222222222222222222',
    },
    {
        id: 3,
        title: '333333333333333333333333333333333333333333',
    },
    {
        id: 4,
        title: '444444444444444444444444444444444444444444',
    },
    {
        id: 5,
        title: '5555555555555555555555555555555555555555555',
    },
]
export default Show
