import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../types/navigation'
import { Container, SportsImage, SportsName, SportsAddress } from './styled'

interface IProps {
    Sports: any;
}

const Sports: React.FC<IProps> = ({
    Sports,
}: IProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams, 'Sports'>>()
    const { name, address } = Sports
    return (
        <Container
            onPress={() => navigation.navigate('SportsDetail', Sports)}
        >
            <SportsImage source={require('../../assets/Sports/Sports_sample.png')} height={300} />
            <SportsName>{name}</SportsName>
            <SportsAddress>{address}</SportsAddress>
        </Container>
    )
}

export default Sports