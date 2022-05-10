import React from 'react'
import styled from 'styled-components/native'
import SearchBar from '../../components/Header/SearchBar'
import { View } from '../../components/Themed'


const Main: React.FC = () => {
    return (
        <View>
            <SearchBar visible={true}></SearchBar>
        </View>
    )
}

const SearchContainer = styled.FlatList`
`

export default Main
