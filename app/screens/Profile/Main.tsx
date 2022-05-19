import React, { useState } from 'react'
import { Animated, Dimensions, Image } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import TextStyles from '../../components/styled/TextStyles'
import { Button, ScrollView, TextInput, View } from '../../components/Themed'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useProfile } from '../../hooks/graphql/profile'
const Main: React.FC = () => {
    const width = Dimensions.get('window').width

    const { data, error, loading } = useProfile()

    console.log(data, error)


    const [editMode, setEditMode] = useState(false)
    const [editName, setEditName] = useState(false)

    const [displayName, setDisplayName] = useState('eung')

    const theme = useTheme()

    return (
        <SafeAreaProvider>
            <Container
                bounces={false}
            >
                <Animated.Image
                    source={require('../../../assets/images/profile-background-golf.jpg') }
                    style={{ width, height: 320 }}
                />
                <ProfileContainer>
                    <Avatar
                        source={require('../../../assets/images/sample-cat.jpg') }
                    />
                    <RowCenter>
                        <EditModeRow>
                            {editMode ? (
                                <>
                                    {editName ? (
                                        <EditModeRow
                                            style={{
                                                height: 40,
                                            }}
                                        >
                                            <EditDisplayName
                                                onChangeText={text => setDisplayName(text)}
                                                autoFocus={true}
                                                onBlur={() => setEditName(false)}
                                                defaultValue={displayName}
                                                onSubmitEditing={() => setEditName(false)}
                                            />
                                        </EditModeRow>
                                    ): (
                                        <EditModeRow>
                                            <DisplayName>{displayName}</DisplayName>
                                            <EditButton onPress={() => {
                                                console.log('change')
                                                // refEditDisplayName
                                                setEditName(true)
                                            }}>
                                                <MaterialIcons name="mode-edit" size={16} color={theme.colors.text}
                                                    style={{
                                                        position: 'absolute',
                                                        right: -20,
                                                    }}
                                                />
                                            </EditButton>
                                        </EditModeRow>
                                    )}
                                </>
                            ): (
                                <DisplayName>{displayName}</DisplayName>
                            )}
                        </EditModeRow>
                    </RowCenter>
                </ProfileContainer>

            </Container>
            {editMode ? (
                <EditProfileButton
                    onPress={() => {
                        setEditName(false)
                        setEditMode(false)
                    }}
                >
                    <EditProfile>수정완료</EditProfile>
                </EditProfileButton>
            ): (
                <EditProfileButton
                    onPress={() => setEditMode(true)}
                >
                    <EditProfile>프로필수정</EditProfile>
                </EditProfileButton>
            )}
        </SafeAreaProvider>
    )
}

const Container = styled(ScrollView)`
`

const EditProfileButton = styled(Button)`
    margin: 12px;
    padding: 12px;
    align-items: center;
    border-radius: 12px;
`

const EditButton = styled(Button)`
    border: none;
`

const EditProfile = styled(TextStyles.Medium)`
    font-size: 16px;
`

const RowCenter = styled(View)`
    justify-content: center;
    align-items: center;
    width: 100%;
`

const ProfileContainer = styled(View)`
    align-items: center;
    background-color: 'transparents';
    top: -60px;
`

const Avatar = styled(Image)`
    width: 120px;
    height: 120px;
    background : #ccc;
    border-radius: 120px;
    border: 2px solid #fff;
`

const DisplayName = styled(TextStyles.Bold)`
    font-size: 24px;
`

const EditDisplayName = styled(TextInput)`
    text-align: center;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    font-size: 24px;
    font-weight: bold;
`

const EditGreetings = styled(TextInput)`
    text-align: center;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    font-size: 16px;
`

const EditModeRow = styled(Animated.View)`
    flex-direction: row;
    align-items: center;
`

export default Main
