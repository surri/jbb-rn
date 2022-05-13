import styled from 'styled-components/native'
import { Text } from '../Themed'

const Bold = styled(Text)`
    font-family: 'notosans-bold';
`

const Regular = styled(Text)`
    font-family: 'notosans';
`

const Medium = styled(Text)`
    font-family: 'notosans-medium';
`

const Light = styled(Text)`
    font-family: 'notosans-light';
`

export default {
    Bold,
    Regular,
    Medium,
    Light,
}