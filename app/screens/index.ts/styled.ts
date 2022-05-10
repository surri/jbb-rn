import styled from 'styled-components/native'
import { FlatList } from 'react-native'

export const Container = styled.View`
`

export const SportsFlatList = (styled.FlatList`
` as unknown) as typeof FlatList

export const SportsBox = styled.View`
    padding: 0 24px;
`
export default styled
