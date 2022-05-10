import React from 'react'
import styled from 'styled-components/native'

interface Partition {
    height?: number;
    color?: string;
}

const Partition = styled.View`
    margin: 16px 0;
    height: ${(props: Partition) => props.height || 0.5}px;
    background-color: ${(props: Partition) => props.color || '#e5e5e5'};
`

interface IProps {
    height: number;
    color: string;
}

const PartitionPost: React.FC<IProps> = ({
    height,
    color,
}: IProps) => (
    <Partition height={height} color={color} />
)

export default PartitionPost