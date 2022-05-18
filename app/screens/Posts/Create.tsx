import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { useForm } from 'react-hook-form'
import { useNavigation, useTheme } from '@react-navigation/native'
import TextStyles from '../../components/styled/TextStyles'
import { Button, ScrollView, TextInput, View } from '../../components/Themed'
import { StackNavigationProp } from '@react-navigation/stack'
import { TabNavigatorParams } from '../../types/navigation'
import AttachImages from '../../components/AttachImages'
import { ReactNativeFile } from 'apollo-upload-client'
import { gql, useMutation } from '@apollo/client'
import ImageViewer from '../../components/Shared/ImageViewer'

// };
type IForm = {
    title: string,
    contents: string,
    images: any
}
const UPLOAD_IMAGE = gql`
mutation uploadImages($files: [Upload]) {
    uploadImages(files: $files) {
        id
    }
}
`
const Create: React.FC = ({ route }: any) => {
    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm<IForm>({
        defaultValues: {
            title: '',
            contents: '',
            images: [],
        },
    })
    const navigation = useNavigation<StackNavigationProp<TabNavigatorParams>>()
    const [uploadImage, { data, loading, error }] = useMutation(UPLOAD_IMAGE)


    const generateRNFile = (uri, name) => {
        return uri ? new ReactNativeFile({
            uri,
            type: 'image',
            name,
        }) : null
    }

    const onSubmit = async (form: IForm) => {
        const files = watch('images').map(image => {
            return generateRNFile(image, `picture-${Date.now()}.jpg`)
        })
        try {
            console.log(JSON.stringify({
                variables: { files },
            }))
            await uploadImage({
                variables: { files },
            }).then(res => console.log(res))
                .catch(err =>console.log(err))
            // setStatus('Uploaded')
        } catch (e) {
            console.log(e,'e')
            // setStatus('Error')
        }
        // pickImage()
        // navigation.goBack()
    }

    useEffect(() => {
        register('title', {
            required: '제목을 입력해주세요.',
        })
        register('contents', {
            required: '내용을 입력해주세요.',
        })
        register('images')
    }, [])

    const theme = useTheme()

    const onAddImages = ({ uri }: {uri: string}) => {
        setValue('images', watch('images').concat(uri))
    }

    const onDelete = ({ uri }: {uri: string}) => {
        setValue('images', watch('images').filter((item: string) => item != uri ))
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <Container
                keyboardShouldPersistTaps="handled"
            >
                <ContentsContainer>
                    <TitleInput
                        onChangeText={text => setValue('title', text)}
                        value={watch('title')}
                        placeholder="제목"
                        placeholderTextColor={theme.colors.inactive}
                    />
                    <ContentsInput
                        onChangeText={text => setValue('contents', text)}
                        value={watch('contents')}
                        placeholder="내용"
                        placeholderTextColor={theme.colors.inactive}
                        multiline={true}
                    />
                </ContentsContainer>
                <AttachImages
                    onAddImages={onAddImages}
                    onDelete={onDelete}
                    images={watch('images')}
                    max={4}
                />
            </Container>
            <ButtonContainer
                onPress={handleSubmit(onSubmit)}
            >
                <ButtonText>작성완료</ButtonText>
            </ButtonContainer>
        </KeyboardAvoidingView>
    )
}

export default Create

const Container = styled(ScrollView)`
    flex: 1;
    padding: 0 24px;
`

const ButtonContainer = styled(Button)`
    justify-content: center;
    align-items: center;
    padding: 12px;
    margin: 12px;
    border-radius: 12px;
`

const ContentsContainer = styled(View)`
    flex: 1;
`

const ButtonText = styled(TextStyles.Medium)`
    font-size: 16px;
`

const TitleInput = styled(TextInput)`
    padding: 12px;
    border-radius: 8px;
    margin: 16px 0;
    font-size: 20px;
`

const ContentsInput = styled(TextInput)`
    padding: 12px;
    border-radius: 8px;
    margin: 16px 0;
    height: 280px;
    font-size: 20px;
`