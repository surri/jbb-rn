import styled from 'styled-components/native'
import TextStyles from '../styled/TextStyles'

interface ImageHeight {
    height: any;
}

export const Container = styled.TouchableOpacity`
    flex: 1;
    margin: 4px 0;
    border-radius: 8px;
    box-shadow: 0px 2px 1px #999999;
    background: #ffffff;
`

export const SportsCardContainer = styled.TouchableOpacity`
    display: flex;
    position: relative;
    padding: 0 24px;
`

export const InfoContainer = styled.View`
    flex-direction: row;
    padding: 6px;
`

export const SportsMemberCardContainer = styled.View`
    flex-direction: row;
    padding: 10px;
`

export const SportsPostCardContainer = styled.View`
    align-items: center;
    flex-direction: row;
    padding: 10px;
`

export const SportsImage = styled.Image`
    width: 240px;
    height: 300px;
    margin-right: 24px;
`

export const SportsName = styled(TextStyles.Medium)`
    padding-bottom: 4px;
`

export const SportsAddress = styled(TextStyles.Regular)`
    color: #333333;
`

export const SummaryName = styled(TextStyles.Regular)`
    color: #777777;
`

export const TagsContainer = styled.View`
    flex-direction: row;
    padding-top: 8px;
`

//banner
export const BannerContainer = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;
    flex-direction: column;
`

export const BannerBackgroundImage = styled.ImageBackground`
    width: 100%;
    height: ${(props: ImageHeight) => props.height}px;
    flex: 1;
    resize: cover;
`

//inputbox
export const SafeAreaContainer = styled.SafeAreaView`
    width:100%;
    align-items: center;
`

export const MemberTotal = styled(TextStyles.Regular)`
    padding-bottom: 4px;
`


export const SportsMemberName = styled(TextStyles.Regular)`
`

export const SportsMemberInfo = styled(TextStyles.Regular)`
`

export const MasterBadge = styled(TextStyles.Bold)`
    color: #0056A4;
    margin-left: 12px;
`

export default styled
