import React from 'react'
import styled from 'styled-components/native'
import TextStyles from '../styled/TextStyles'
import { ViewProps } from '../Themed'
import { useTheme } from '@react-navigation/native'

const PrimaryContainer = styled.View`
    flex-direction: row;
    border-radius: 4px;
    width: 100%;
    padding: 8px 2px;
    border-bottom-width: 2px;
    border-bottom-color: ${(props: {borderColor: string}) => props.borderColor};
`
const SubjectText = styled(TextStyles.Bold)`
    font-size: 20px;
`

const TextContainer = styled.View`
    flex-direction: column;
`

const PrimaryText = styled(TextStyles.Medium)`
    font-size: 18px;
`

type IProps = ViewProps & {
    subject: string;
    textArray: string[];
}

const InfomationTitle: React.FC<IProps> = ({
    subject,
    textArray,
    style,
}: IProps) => {
    const theme = useTheme()
    return (
        <PrimaryContainer borderColor={theme.colors.text} style={style}>
            <TextContainer>
                {textArray && textArray.map((text: string, index: number) => (
                    <PrimaryText key={index}>
                        {index == 0 && <SubjectText >{subject}</SubjectText>}
                        {text}
                    </PrimaryText>
                ))}
            </TextContainer>
        </PrimaryContainer>
    )
}

export default InfomationTitle