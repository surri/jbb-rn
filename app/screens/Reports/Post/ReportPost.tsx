import React, { useState } from 'react'
import styled from 'styled-components/native'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { RouteProp, useTheme } from '@react-navigation/native'
import TextStyles from '../../../components/styled/TextStyles'
import { Button, ScrollView, TextInput, View } from '../../../components/Themed'
import { ReportsNavigatorParams } from '../../../types/navigation'
import useCreateReportPost from '../../../hooks/graphql/repots/useCreateReportPost'
import Toast from 'react-native-root-toast'
import { StackNavigationProp } from '@react-navigation/stack'
import { useUpdateUserBlock } from '../../../hooks/graphql/users'

type Props = {
    route: RouteProp<ReportsNavigatorParams, 'ReportPost'>
    navigation: StackNavigationProp<ReportsNavigatorParams, 'ReportPost'>
}

const ReportPost: React.FC<Props> = ({ route, navigation }: Props) => {
    const { post, category } = route.params || {}

    const [contents, setContents] = useState('')

    const [createReportPost] = useCreateReportPost()

    const [updateUserBlock] = useUpdateUserBlock()

    const [complete, setComplete] = useState(false)

    const [blocked, setBlocked] = useState(false)

    const theme = useTheme()

    const onSubmit = async () => {
        try {
            await createReportPost({
                variables: {
                    input: {
                        postId: Number(post?.id),
                        categoryId: Number(category?.id),
                        contents,
                    },
                },
            }).then(() => {
                setComplete(true)
            }).catch(({ message }) => {
                Toast.show(message, {
                    animation: true,
                    hideOnPress: true,
                    keyboardAvoiding: true,
                    position: 400,
                    backgroundColor: theme.colors.card,
                    opacity: 0.9,
                    textStyle: {
                        fontFamily: 'notosans-medium',
                    },
                })
            })
        } catch (e) {
            console.log(e,'e')
        }
        setComplete(true)
    }

    const onBlock = async () => {
        const { userId } = post

        setBlocked(true)
        try {
            await updateUserBlock({
                variables: {
                    blockUserId: Number(userId),
                },
            }).then(({ data }) => {
                setBlocked(data.updateUserBlock.block)

                Toast.show(data.updateUserBlock.block ? '차단했습니다' : '차단을 해제했습니다', {
                    animation: true,
                    hideOnPress: true,
                    keyboardAvoiding: true,
                    position: 400,
                    backgroundColor: theme.colors.card,
                    opacity: 0.9,
                    textStyle: {
                        fontFamily: 'notosans-medium',
                    },
                })

                data.updateUserBlock.block && navigation.getParent()?.goBack()
            }).catch(() => {
                setBlocked(false)
            })
        } catch (e) {
            console.log(e,'e')
        }
    }


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <Container keyboardShouldPersistTaps="handled">
                {complete ? (
                    <>
                        <HeaderContainer>
                            <HeaderInfoTitle>신고가 접수되었습니다.</HeaderInfoTitle>
                            <HeaderInfoDescription></HeaderInfoDescription>
                            <HeaderInfoDescription>확인 후 조치하도록 하겠습니다.</HeaderInfoDescription>
                        </HeaderContainer>
                        <HeaderContainer>
                            <HeaderInfoTitle>[{post.author}]님을 차단하시겠어요?</HeaderInfoTitle>
                            <HeaderInfoDescription></HeaderInfoDescription>
                            <HeaderInfoDescription>[{post.author}]님의 글을 볼수 없게됩니다.</HeaderInfoDescription>
                        </HeaderContainer>
                        <BlockButton
                            onPress={onBlock}
                        >
                            <BlockText>{blocked ? '차단해제' : '차단하기'}</BlockText>
                        </BlockButton>
                    </>
                ) : (
                    <>
                        <HeaderContainer>
                            <HeaderInfoTitle>신고 내용을 작성해주세요.</HeaderInfoTitle>
                            <HeaderInfoDescription></HeaderInfoDescription>
                            <HeaderInfoDescription>상세 내용을 작성해주세요.</HeaderInfoDescription>
                            <HeaderInfoDescription>신고 내용은 본인 외에는 알 수 없습니다.</HeaderInfoDescription>
                        </HeaderContainer>
                        <HeaderInfoTitle>[{post.title}]</HeaderInfoTitle>
                        <ContentsContainer>
                            <ContentsInput
                                onChangeText={text => setContents(text)}
                                value={contents}
                                placeholder="내용"
                                placeholderTextColor={theme.colors.inactive}
                                multiline={true}
                            />
                            <ReportButton
                                onPress={onSubmit}
                            >
                                <ButtonText>작성완료</ButtonText>
                            </ReportButton>
                        </ContentsContainer>
                    </>
                )}
            </Container>
        </KeyboardAvoidingView>
    )
}

export default ReportPost

const Container = styled(ScrollView)`
    flex: 1;
    padding: 0 24px;
`

const HeaderContainer = styled(View)`
    padding: 24px 0;
`

const HeaderInfoTitle = styled(TextStyles.Bold)`
    font-size: 18px;
`

const HeaderInfoDescription = styled(TextStyles.Medium)`
    font-size: 14px;
    color: ${props => props.theme.colors.description};
`

const ContentsContainer = styled(View)`
    flex: 1;
`


const BlockButton = styled(Button)`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    border-radius: 12px;
    border-color: ${props => props.theme.colors.notification};
`

const BlockText = styled(TextStyles.Medium)`
    font-size: 16px;
    color: ${props => props.theme.colors.notification};
`

const ReportButton = styled(Button)`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    border-radius: 12px;
`

const ButtonText = styled(TextStyles.Medium)`
    font-size: 16px;
`

const ContentsInput = styled(TextInput)`
    padding: 12px;
    border-radius: 8px;
    margin: 16px 0;
    height: 160px;
    font-size: 16px;
`