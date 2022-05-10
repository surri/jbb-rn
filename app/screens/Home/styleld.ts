import styled from 'styled-components/native'

interface ScreenName {
    color?: string;
}

export const SectionContainer = styled.SectionList`
    flex: 1;
`

export const Renders = styled.View`
    flex: 1;
    padding: 0 24px;
`

export const ScreenName = styled.Text`
    font-size: 14px;
    color: ${(props: ScreenName) => props.color || '#000'};
`

export const Subtitle = styled.Text`
    padding: 0 24px 4px;
    font-size: 12px;
    color: #00AC69;
`

export const Title = styled.Text`
    padding: 0 24px;
    font-size: 21px;
`


export default styled
