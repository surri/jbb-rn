import React from 'react'
import styled from 'styled-components/native'
import { useTheme } from '@react-navigation/native'
import TextStyles from '../styled/TextStyles'

const CheckItem = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 12px 0;
    justify-content: space-between;
`
const CheckItemLabel = styled(TextStyles.Regular)`
    color: #333333;
`
const CheckItemRequire = styled(TextStyles.Regular)`
    color: #7e7e7e;
`
const CheckItemCircle = styled.View`
    background-color: #e5e5e5;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    margin-right: 8px;
`

const ItemLabelWrap = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-width: 2px;
    border-bottom-color: #e5e5e5;
    padding-bottom: 2px;
`

const CheckButton = styled.TouchableOpacity`
    margin-right: 8px;
`

export type ICheckBox = {
    id: number;
    label: string,
    require: boolean,
    checked: boolean,
}

type IProps = {
    item: ICheckBox,
    onPress: (id: number) => void;
}

const CheckBox: React.FC<IProps> = ({
    item: { id, label, require, checked },
    onPress,
}: IProps) => {
    const theme = useTheme()
    console.log(label,'label', checked,'checked')
    return (
        <CheckItem>
            <ItemLabelWrap>
                <CheckItemCircle />
                <CheckItemLabel>{label} (<CheckItemRequire>{require ? '필수' : '선택'}</CheckItemRequire>)</CheckItemLabel>
            </ItemLabelWrap>
            <CheckButton onPress={()=> onPress(id)}>
                {/* <CheckIcon width={16} stroke={checked ? theme.colors.primary : '#e5e5e5'} strokeWidth={4} /> */}
            </CheckButton>
        </CheckItem>
    )
}

export default CheckBox