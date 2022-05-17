import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { useForm } from 'react-hook-form'
import { useNavigation, useTheme } from '@react-navigation/native'
import TextStyles from '../../components/styled/TextStyles'
import { Button, ScrollView, TextInput, View } from '../../components/Themed'
import { StackNavigationProp } from '@react-navigation/stack'
import { TabNavigatorParams } from '../../types/navigation'

type IForm = {
    title: string,
    contents: string,
    images: any
}

const Create: React.FC = ({ route }: any) => {
    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm<IForm>({
        defaultValues: {
            title: '',
            contents: '',
            images: [],
        },
    })
    const navigation = useNavigation<StackNavigationProp<TabNavigatorParams>>()


    const onSubmit = (form: IForm) => {
        console.log(form, 'form')
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

    const onAddImages = (photo: any) => {
        setValue('images', watch('images').concat({ uri: photo.uri }))
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
    border: 2px solid #000;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    margin: 12px;
    border-radius: 16px;
`

const ContentsContainer = styled(View)`
    flex: 1;
`

const ButtonText = styled(TextStyles.Bold)`
    font-size: 20px;
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