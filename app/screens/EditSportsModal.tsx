import { StatusBar } from 'expo-status-bar'
import { Keyboard, Dimensions, Platform, SafeAreaView } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { FontAwesome5, FontAwesome, Ionicons, Entypo } from '@expo/vector-icons'
import { Button, Card, KeyboardAvoidingView, ScrollView, View } from '../components/Themed'
import {
    MenuProvider,
} from 'react-native-popup-menu'
import styled from 'styled-components/native'
import { useSports } from '../hooks/graphql/sports'
import TextStyles from '../components/styled/TextStyles'
import { useEffect, useRef, useState } from 'react'
import InfomationTitle from '../components/Shared/InfomationTitle'
import { useRecoilState } from 'recoil'
import { selectedSportsState } from '../recoil/selectors'

export type Sports = {
    id: number,
    name: string,
    nameKR: string,
    description: string,
    image: string,
}

type StyledSportsBox = {
    width?: number,
    borderColor?: string,
    background?: string,
}

export default function EditSportsModal() {
    const theme = useTheme()

    const navigation = useNavigation()

    const columnWidth = (Dimensions.get('window').width / 3)

    const [SelectedSports, setSelectedSports] = useRecoilState<any>(selectedSportsState)

    const [searchActive, setSearchActive] = useState(false)

    const { data, error, loading } = useSports()

    const [sports, setSports] = useState<Sports>()

    const onSelectSports = (item: Sports) => {
        setSelectedSports(item)
        setSearchActive(false)
        Keyboard.dismiss()
        navigation.goBack()
    }

    useEffect(() => {
        setSports(data?.sports)
    }, [loading])

    const Item = ({ item, selected }: {item: Sports, selected: boolean}) => {
        const selectedColor = selected ? theme.colors.active : theme.colors.placeHolder
        return (
            <SportsBox
                width={columnWidth}
                background='transparent'
                borderColor={selectedColor}
                onPress={() => onSelectSports(item)}
            >
                {selected && <SelectedIcon><FontAwesome name="check" size={24} color={selectedColor} /></SelectedIcon>}
                {item.name == 'fitness' ? (
                    <FontAwesome5 name="dumbbell" size={48} color={selectedColor} />
                ) : item.name == 'golf' ? (
                    <FontAwesome5 name="golf-ball" size={48} color={selectedColor}  />
                ) : item.name == 'hiking' ? (
                    <FontAwesome5 name="hiking" size={48} color={selectedColor} />
                ) : item.name == 'football' ? (
                    <Ionicons name="football" size={48} color={selectedColor} />
                ) : (
                    null
                )}
                <SportsLabel
                    color={selectedColor}
                    style={{ fontWeight: selected ? 'bold' : 'normal' }}
                >{item.nameKR}</SportsLabel>
            </SportsBox>
        )
    }

    return  error || loading ? (null) : (
        <KeyboardAvoidingView
            style={{ flexGrow: 1 }}
            keyboardVerticalOffset={
                Platform.select({
                    ios: 20,
                    android: 200,
                })
            }
        >
            <SafeAreaView
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                >
                    <Container>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            display: searchActive ? 'none' : 'flex',
                        }}>
                            <InfomationTitle
                                subject='취미'
                                textArray={[
                                    '를',
                                    '선택해주세요',
                                ]}
                                style={{ marginBottom: 36 }}
                            />
                        </View>
                        {sports && sports.map((item: Sports, index: number) =>
                            <Item
                                item={item}
                                key={index}
                                selected={item.id == SelectedSports?.id}
                            />,
                        )}
                    </Container>
                </ScrollView>
                {/** 검색 도입후 */}
                {/* <SearchContainer>
                    <SearchIcon name="magnifying-glass" size={24} color={theme.colors.text} />
                    <SearchInputBox
                        onBlur={() => setSearchActive(false)}
                        onFocus={() => setSearchActive(true)}
                        color={theme.colors.text}
                        onChangeText={(value) => setKeyword(value)}
                        placeholder={'Search'}
                        placeholderTextColor={theme.colors.placeHolder}
                    />
                </SearchContainer> */}
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const Container = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 24px;
`

const SelectedIcon = styled(View)`
    position: absolute;
    right: 4px;
    top: 4px;
    background: transparent;
`

const SportsBox = styled(Button)`
    border-color: ${(props: StyledSportsBox) => props.borderColor};
    width: ${(props: StyledSportsBox) => props.width || 24}px;
    height: ${(props: StyledSportsBox) => props.width || 24}px;
    margin: 16px;
    border-radius: 20px;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    background: ${(props: StyledSportsBox) => props.background || 'transparent'};
`

const SportsLabel = styled(TextStyles.Medium)`
    color: ${(props: {color: string}) => props.color};
    font-size: 16px;
`

const SearchContainer = styled(View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 40px;
    border-radius: 20px;
    border-width: 2px;
    margin: 12px;
`

const SearchInputBox = styled.TextInput`
    flex: 1;
    padding: 10px 10px 10px 0;
    color: ${(props: {color: string}) => `${props.color}`};
    font-weight: bold;
`

const SearchIcon = styled(Entypo)`
    padding: 10px;
`
