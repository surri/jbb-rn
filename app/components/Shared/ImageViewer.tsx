import { useEffect, useState } from 'react'
import { Image, Modal } from 'react-native'
import { ImageViewer as ImageViewerBase } from 'react-native-image-zoom-viewer'
import { View } from '../Themed'

const ImageViewer = ({
    images,
    visible,
    onClose,
    activeIndex: prevActiveIndex,
}: any) => {
    const [activeIndex, setActiveIndex] = useState(0)
    useEffect(() => {
        setActiveIndex(prevActiveIndex)
    },[prevActiveIndex])

    return (
        <Modal
            visible={visible}
            onRequestClose={() => onClose()}
        >
            <ImageViewerBase
                imageUrls={images}
                enableSwipeDown={true}
                index={activeIndex}
                saveToLocalByLongPress={false}
                enablePreload={true}
                onSwipeDown={() => onClose()}
                onChange={index => !!index && setActiveIndex(index)}
                renderImage={({ source, style }) => {
                    return(
                        <View
                            style={{ flexDirection: 'column', alignItems: 'center' }}
                        >
                            <Image
                                source={source}
                                style={style}
                                resizeMode="contain"
                            />
                        </View>
                    )
                }}
            />
        </Modal>
    )
}

export default ImageViewer