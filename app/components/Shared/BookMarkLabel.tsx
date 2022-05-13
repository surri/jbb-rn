import React from 'react'
import styled from 'styled-components/native'
import TextStyles from '../styled/TextStyles'

interface LabelStyle {
    width?: number,
    height?: number,
    color?: string,
    backgroundColor?: string,
}

interface IProps extends LabelStyle {
    text: string
}

const BookMarkLabelContainer = styled.View`
    width: ${(props: LabelStyle) => props.width || 89}px;
    height: ${(props: LabelStyle) => props.height || 26}px;
    overflow: hidden;
`
const BookMarkTextContainer = styled.View`
    z-index: 2;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: ${(props: LabelStyle) => props.height ? props.height/2 : 0}px;
    align-items: center;
    width: ${(props: LabelStyle) => props.width && props.height ? (props.width - props.height / 2) : 70}px;
    height: ${(props: LabelStyle) => props.height || 26}px;
    background-color: ${(props: LabelStyle) => props.backgroundColor || '#f5f5f5'};
    overflow: hidden;
`
const BookMarkDot = styled.View`
    width:6px;
    height:6px;
    border-radius: 3px;
    background-color: ${(props: LabelStyle) => props.color || '#00AC69'};
    margin-right: 8px;
`

const BookMarkTriangle = styled.View`
    position: absolute;
    overflow: hidden;
    z-index: 1;
    background-color: ${(props: LabelStyle) => props.backgroundColor || '#f5f5f5'};
    left: ${(props: LabelStyle) => props.width && props.height ? (props.width - props.height - (props.height/5) ): 26}px;
    width: ${(props: LabelStyle) => props.height || 26}px;
    height: ${(props: LabelStyle) => props.height || 26}px;
    transform: rotate(45deg);
`
const BooMarkText = styled(TextStyles.Regular)`
    color: ${(props: LabelStyle) => props.color || '#00AC69'};
`

const BookMarkLabel: React.FC<IProps> = ({
    text,
    width,
    height,
    color,
    backgroundColor,
}: IProps) => {
    return (
        <BookMarkLabelContainer width={width} height={height}>
            <BookMarkTextContainer width={width} height={height} backgroundColor={backgroundColor}>
                <BookMarkDot color={color} />
                <BooMarkText color={color}>{text}</BooMarkText>
            </BookMarkTextContainer>
            <BookMarkTriangle width={width} height={height} backgroundColor={backgroundColor} />
        </BookMarkLabelContainer>
    )
}

BookMarkLabel.defaultProps = {
    width: 79,
    height: 26,
    color: '#00AC69',
    backgroundColor: '#f5f5f5',
}

export default BookMarkLabel