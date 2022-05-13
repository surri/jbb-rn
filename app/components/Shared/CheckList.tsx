import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import TextStyles from '../styled/TextStyles'
// import CheckIcon from '../assets/check.svg'
import CheckBox, { ICheckBox } from './CheckBox'
import { useTheme } from '@react-navigation/native'

const CheckListContainer= styled.View`
    width: 100%;
`

const CheckAll = styled.View`
    width: 100%;
    padding-bottom: 8px;
    flex-direction: row;
    border-bottom-width: 2px;
    border-bottom-color: #e5e5e5;
    margin-bottom: 16px;
    justify-content: space-between;
`

const TextWrap = styled.View`
    margin-left: 8px;
    justify-content: flex-end;
`

const CheckAllLabel = styled(TextStyles.Regular)`
    font-weight: bold;
`
const CheckAllButton = styled.TouchableOpacity`
    background-color: #e5e5e5;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 32px;
`


type IProps = {
    checkList: ICheckBox[],
    updateCheckList: (checkList: ICheckBox[]) => void;
}

const CheckList: React.FC<IProps> = ({
    checkList,
    updateCheckList,
}: IProps) => {
    const theme = useTheme()
    const [list, setList] = useState<ICheckBox[]>(checkList)
    const onPress = (id: number) => {
        setList(prevState => prevState.map(item => ({
            ...item, ...(item.id == id) && { checked: !item.checked },
        })))
    }
    const isCheckAll = () => list.every(item => item.checked == true)
    const onPressCheckAll = () => setList(prevState => prevState.map(item => ({ ...item, checked: isCheckAll() ? false : true })))

    useEffect(() => {
        updateCheckList(list)
    }, [list])

    return (
        <CheckListContainer>
            <CheckAll>
                <TextWrap><CheckAllLabel>전체동의</CheckAllLabel></TextWrap>
                <CheckAllButton
                    onPress={onPressCheckAll}
                >
                    {/* <CheckIcon width={16} stroke={isCheckAll() ? theme.colors.primary :'#ffffff'} strokeWidth={4} /> */}
                </CheckAllButton>
            </CheckAll>
            {list.map((item, index) => <CheckBox key={index} item={item} onPress={onPress} />)}
        </CheckListContainer>
    )
}

export default CheckList