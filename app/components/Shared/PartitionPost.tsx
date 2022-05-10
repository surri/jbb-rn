import React from 'react'
import styled from 'styled-components/native'

const Partition = styled.View`
    margin: 16px 0;
    height: 0.5px;
    background-color: #ccc;
`

const PartitionPost: React.FC = () => (
    <Partition />
)

export default PartitionPost