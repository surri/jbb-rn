import React from 'react';
import { Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const OneShopBanners: React.FC = () => {

    const screenWidth = Dimensions.get('window').width;
    const ratio = screenWidth/360;

    const bannerSampleData = [
        '../../assets/banner_sample.png',
        '../../assets/banner_sam2ple.png',
    ];

    return  (
        <Carousel
            data={bannerSampleData}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            renderItem={({ item, index }) => (
                <Image
                    key={index}
                    style={{
                        width: screenWidth,
                        height: 100 * ratio,
                    }}
                    resizeMode="contain"
                    defaultSource={require('../../assets/banner_sample.png')}
                    source={require('../../assets/banner_sample.png')}
                // source={{ uri: item }}
                />
            )}
        />
    );
};

export default OneShopBanners;