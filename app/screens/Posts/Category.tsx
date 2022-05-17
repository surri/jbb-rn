import React, { useEffect } from 'react'
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
}

const Category: React.FC = ({ route }: any) => {
    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm<IForm>({
        defaultValues: {
            title: '',
            contents: '',
        },
    })
    const navigation = useNavigation<StackNavigationProp<TabNavigatorParams>>()

    const onSubmit = (form: IForm) => {
        console.log('asdf')
        navigation.goBack()
    }

    useEffect(() => {
        register('title', {
            required: '제목을 입력해주세요.',
        })
        register('contents', {
            required: '내용을 입력해주세요.',
        })
    }, [])

    const theme = useTheme()
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
                        placeholder="제목ffff"
                        placeholderTextColor={theme.colors.inactive}
                        secureTextEntry={true}
                    />
                    <ContentsInput
                        onChangeText={text => setValue('contents', text)}
                        value={watch('contents')}
                        placeholder="내용"
                        placeholderTextColor={theme.colors.inactive}
                        secureTextEntry={true}
                        multiline={true}
                    />
                    <Description>
                        <DescriptonText>사진등록 (최대5장)</DescriptonText>
                    </Description>
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

export default Category

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

const Description = styled.View`
    flex-direction: row;
    align-items: center;
`

const DescriptonText = styled(TextStyles.Regular)`
    padding-right: 8px;
`