import React, { useEffect, useState } from 'react'
import { Animated, Dimensions, Image } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import TextStyles from '../../components/styled/TextStyles'
import { Button, ScrollView, TextInput, View } from '../../components/Themed'
import { MaterialIcons } from '@expo/vector-icons'
import { RouteProp, useTheme } from '@react-navigation/native'
import { useProfile } from '../../hooks/graphql/profile'
import useUpdateProfile from '../../hooks/graphql/profile/useUpdateProfile'
import { RootStackParams } from '../../types/navigation'

export type Profile = {
    id: string,
    displayName: string,
    email: string,
    phone: string,
}

type Props = {
    route: RouteProp<RootStackParams, 'UserProfile'>,
}

const UserProfile: React.FC<Props> = ({ route }: Props) => {
    const { userId } = route.params || {}

    console.log('Profile', userId)

    const width = Dimensions.get('window').width

    const [profile, setProfile] = useState<Profile>()

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
                            <DisplayName>{displayName}</DisplayName>
                        </EditModeRow>
                    </RowCenter>
                </ProfileContainer>

            </Container>
        </SafeAreaProvider>
    )
}

const Container = styled(ScrollView)`
`

const EditButton = styled(Button)`
    border: none;
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

export default UserProfile
