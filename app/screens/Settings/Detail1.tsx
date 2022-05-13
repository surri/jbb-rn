import React from 'react'
import { ImageHeaderScrollView } from 'react-native-image-header-scroll-view'
import styled from 'styled-components/native'
import TextStyles from '../../components/styled/TextStyles'
import Tag from '../../components/Shared/Tag'
import Map from '../../components/Shared/Map'

const TagsContainer = styled.View`
    flex-direction: row;
    padding-top: 8px;
`

const TitleContainer = styled.View`
`

const SettingTitle = styled(TextStyles.Regular)`
    margin-top: 8px;
    color: #ffffff;
`

const DetailRow = styled.View`
    margin: 10px 24px 0;
    border-bottom-width: 1px;
    border-bottom-color: #f5f5f5;
    padding-bottom: 16px;
`

const DetailSubject = styled(TextStyles.Regular)`
    margin-top: 8px;
    color: #8966ff;
`

const DetailContens = styled(TextStyles.Regular)`
    margin-top: 8px;
    color: #333333;
`

const Row = (subject: string, contents: string) => {
    return (
        <DetailRow>
            <DetailSubject>{subject}</DetailSubject>
            <DetailContens>{contents}</DetailContens>
        </DetailRow>
    )
}

interface IProps {
    sports: any;
}
const Detail1: React.FC<IProps> = ({ route }: any) => {
    // const { name, open, close, court, tags } = route.params;

    return (
        <ImageHeaderScrollView
            maxHeight={200}
            minHeight={56}
            minOverlayOpacity={0.4}
            headerImage={require('../../assets/sports/sports_sample.png')}
            // renderForeground={(): any => (
            //     <TitleContainer>
            //         <TagsContainer>
            //             {tags.map((tag, index) => tag !== undefined && <Tag key={index} name={tag} />)}
            //         </TagsContainer>
            //         <SettingTitle>{name}</SettingTitle>
            //     </TitleContainer>
            // )}
        >
        </ImageHeaderScrollView>
    )
}

export default Detail1
