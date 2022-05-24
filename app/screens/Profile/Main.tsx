import React, { useEffect, useState } from 'react'
import { Animated, Dimensions, Image } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import TextStyles from '../../components/styled/TextStyles'
import { Button, ScrollView, TextInput, View } from '../../components/Themed'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useProfile } from '../../hooks/graphql/profile'
import useUpdateProfile from '../../hooks/graphql/profile/useUpdateProfile'

export type Profile = {
    id: string,
    displayName: string,
    email: string,
    phone: string,
}

const Main: React.FC = () => {
    const width = Dimensions.get('window').width

    const [profile, setProfile] = useState<Profile>()

    const { data: profileData, loading } = useProfile()

    useEffect(() => {
        profileData?.profile && setProfile(profileData?.profile)
    }, [profileData])


    const [updateProfile] = useUpdateProfile()

    const [editMode, setEditMode] = useState(false)
    const [editName, setEditName] = useState(false)

    const [displayName, setDisplayName] = useState('')

    const theme = useTheme()

    const onUpdateProfile = async(id: string) => {
        try {
            await updateProfile({
                variables: {
                    id: Number(id),
                    input: {
                        displayName,
                    },
                },
            }).then(({ data }) => {
                setDisplayName(data?.updateUser?.displayName)

            }).catch(err =>console.log(err))
        } catch (e) {
            console.log(e,'e')
        }
        setEditName(false)
        setEditMode(false)
    }

    return loading || !profile?.id ? (null) : (
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
                                            style={{ height: 40 }}
                                        >
                                            <EditDisplayName
                                                onChangeText={text => setDisplayName(text)}
                                                value={displayName}
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
                    style={{  borderColor: theme.colors.active }}
                    onPress={() =>  profile.id && onUpdateProfile(profile.id)}
                >
                    <EditProfile style={{ color: theme.colors.active }}>
                        수정완료
                    </EditProfile>
                </EditProfileButton>
            ): (
                <EditProfileButton
                    style={{  borderColor: theme.colors.active }}
                    onPress={() => setEditMode(true)}
                >
                    <EditProfile style={{ color: theme.colors.active }}>
                        프로필 수정
                    </EditProfile>
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
    font-family: 'notosans-bold';
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
