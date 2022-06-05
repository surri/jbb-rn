import React, { useEffect, useRef, useState } from 'react'
import PrimaryButton from '../../components/Shared/PrimaryButton'
import styled from 'styled-components/native'
import ScreenInfo from '../../components/Shared/ScreenInfo'
import PhoneNumberInput from '../../components/Auth/PhoneNumberInput'
import { useNavigation } from '@react-navigation/native'
import ConfirmInput from '../../components/Auth/ConfirmInput'
import { Animated } from 'react-native'
import { useSetRecoilState } from 'recoil'
import { loginState, userState } from '../../recoil/selectors'
import { useAuthNumber } from '../../hooks/graphql/auth'
import useLogin from '../../hooks/graphql/auth/useLogin'

const JoinContainer = styled.ScrollView`
    flex: 1;
    padding: 0 24px;
`

const BottomContainer = styled.View`
    flex: 1;
`

const ChangePhoneNumber: React.FC = () => {
    const navigation = useNavigation<any>()
    const [phone, setPhone] = useState<string>('')
    const [confirmNumber, setConfirmNumber] = useState<string>('')
    const [sended, setSended] = useState<boolean>(false)
    const [timeLimit, setTimeLimit] = useState<number>(0)
    const [sendAuthSms] = useAuthNumber()
    const [authNumber , setAuthNumber] = useState<string | null>(null)

    const [login] = useLogin()


    const phoneNumberFormat = (phoneNumber: string) => {

        if (phoneNumber.length < 4) return phoneNumber

        if (phoneNumber.length < 8) return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`

        return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 7)} ${phoneNumber.slice(7, 11)}`
    }
    const onChnage = (text: string) => {
        const phoneNumber = text.replace(/[^\d]/g, '')
        if(phoneNumber.length < 12) {
            setPhone(phoneNumberFormat(phoneNumber))
        }
    }

    const sendSms = async () => {
        try {
            await sendAuthSms({ variables: { phone } })
                .then(({ data }) => setAuthNumber(data.authNumber))
                .catch(err =>console.log(err))
        } catch (e) {
            console.log(JSON.stringify(e),'e')
        }

        setSended(true)
        showConfirm()
        setTimeLimit(300)
    }
    const setIsLoggin = useSetRecoilState(loginState)
    const setUser = useSetRecoilState(userState)

    const checkConfirmNumber = async () => {
        try {
            await login({ variables: { phone: phone.replaceAll(' ',''), authNumber } })
                .then(({ data: { login: data } }) => {
                    setUser(data)
                    setIsLoggin(true)
                    //set AccessToken && userInfo
                })
                .catch(err =>console.log(err))
        } catch (e) {
            console.log(e,'e')
        }
    }

    useEffect(() => {
        const countDown = setTimeout(() => {
            timeLimit > 0 ? setTimeLimit(prevTime => prevTime - 1) : clearTimeout(countDown)
        }, 1000)
        return () => clearTimeout(countDown)
    },[timeLimit])

    const fadeAnim = useRef(new Animated.Value(0)).current
    const translateX = useRef(new Animated.Value(500)).current

    const showConfirm = () => {
        Animated.timing(fadeAnim, {
            toValue: 100,
            duration: 12000,
            useNativeDriver: true,
        }).start()
        Animated.timing(translateX, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start()
    }

    const convertTimerFomat = () => {
        if (timeLimit < 1) {
            return ''
        }

        if (timeLimit > 60) {
            return `${Math.floor(timeLimit/60)}분 ${timeLimit%60}초`
        }
        return `${timeLimit%60}초`
    }

    return (
        <JoinContainer
            keyboardShouldPersistTaps="handled"
        >
            <ScreenInfo textArray={['휴대폰 번호 인증']} margin="36px 0 0" />
            <PhoneNumberInput
                autoFocus={true}
                require={true}
                maxLength={13}
                value={phone}
                onChangeText={text => onChnage(text)}
                placeholder="전화번호"
                onSubmitEditing={sendSms}
            />
            <BottomContainer>
                <PrimaryButton
                    active={phone.length > 11}
                    text={sended ? `다시 인증하기 ${convertTimerFomat()}` : '인증하기'}
                    onPress={sendSms}
                />
            </BottomContainer>

            {sended && (
                <Animated.View
                    style={{
                        transform: [{ translateX }],
                        opacity: fadeAnim,
                    }}
                >
                    <ConfirmInput
                        autoFocus={true}
                        require={true}
                        maxLength={6}
                        value={confirmNumber}
                        onChangeText={text => setConfirmNumber(text)}
                        placeholder="인증번호"
                        onSubmitEditing={checkConfirmNumber}
                    />

                    <BottomContainer>
                        <PrimaryButton
                            active={confirmNumber.length > 5}
                            text='인증번호 확인'
                            onPress={checkConfirmNumber}
                        />
                    </BottomContainer>
                </Animated.View>
            )}
        </JoinContainer>
    )
}

export default ChangePhoneNumber

