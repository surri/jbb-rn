import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native'
import styled from 'styled-components/native'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from './Themed'
import ImageViewer from './Shared/ImageViewer'

type IProps = {
    images: any;
    max: number;
    onAddImages: (photo: any ) => void;
    onDelete: (photo: any) => void;
}

const AttachImages: React.FC<IProps> = ({
    images,
    max,
    onAddImages,
    onDelete,
}: IProps) => {
    const pickImage = async () => {
        const result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.All,
            allowsMultipleSelection: true,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            onAddImages(result)
        }
    }

    const theme = useTheme()
    const [imageViewerVisible, setImageViewerVisible] = useState(false)
    const [previewActiveIndex, setPreviewActiveIndex] = useState(0)
    return (
        <Container
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {images.length < max && (
                <ImageBox
                    borderColor={theme.colors.placeHolder}
                    onPress={pickImage}
                >
                    <Entypo name="images" size={24} color={theme.colors.placeHolder} />
                </ImageBox>
            )}
            {images.map((uri: string, index: number) => (
                <ImageBox
                    borderColor={theme.colors.placeHolder}
                    key={index}
                    onPress={() => {
                        setImageViewerVisible(true)
                        setPreviewActiveIndex(index)
                    }}
                >
                    <DeleteButton
                        onPress={() => onDelete({ uri })}
                    >
                        <MaterialCommunityIcons name="close-box" size={24} color={theme.colors.text} />
                    </DeleteButton>
                    <AttachImage
                        resizeMode="cover"
                        source={{ uri }}
                    />
                </ImageBox>
            ))}
            <ImageViewer
                images={images.map((url: string) => ({ url }))}
                activeIndex={previewActiveIndex}
                onClose={() => setImageViewerVisible(false)}
                visible={imageViewerVisible}
            />
        </Container>
    )
}

const DeleteButton = styled.Pressable`
    z-index: 4;
    position: absolute;
    right: 0;
    top: 0;
`

const Container = styled.ScrollView`
    flex-direction: row;
`

const ImageBox = styled(TouchableOpacity)`
    width: 64px;
    height: 64px;
    border: 1px solid ${(props:{borderColor: string}) => `${props.borderColor}`};
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-right: 12px;
    background-color: transparent;
    overflow: hidden;
`

const AttachImage = styled.Image`
    width: 64px;
    height: 64px;
`

export default AttachImages
