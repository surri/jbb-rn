import React, { useRef } from 'react'
import styled from 'styled-components/native'
import TextStyles from '../styled/TextStyles'

type Props = {
    // onCancle: () => void,
    // onSubmit: (e: any) => void,
    onCancle: any,
    onSubmit: any,
}

const JoinExitModal = ({ onCancle, onSubmit }: Props) => {

    return (
        <Conatiner>
            <ModalText>입력하신 정보가 사라집니다.</ModalText>
            <ModalText>정말 이동하시겠습니까?</ModalText>
            <Buttons>
                <CancelButton onPress={onCancle}>
                    <ButtonText>취소</ButtonText>
                </CancelButton>
                <SubbmitButton>
                    <ButtonText onPress={onSubmit}>확인</ButtonText>
                </SubbmitButton>
            </Buttons>
        </Conatiner>
    )
}

export default JoinExitModal

const Conatiner = styled.View`
    z-index: 10;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
    padding: 24px;
    border: 1px solid black;
    background-color: #ffffff;
`

const ModalText = styled(TextStyles.M3214)`
    color: black;
`

const Buttons = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 24px 50px;
`

const CancelButton = styled.TouchableOpacity`
    padding: 5px 24px;
    border: 1px solid black;
`

const SubbmitButton = styled(CancelButton)``

const ButtonText = styled.Text``