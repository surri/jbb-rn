import React, { Fragment } from 'react'
import StickBanner from '../../components/Shared/StickBanner'
import { SectionContainer, Renders, Subtitle, Title } from './styleld'

const Home: React.FC = () => {
    const sections = [
        {
            title: 'SlidePlaces',
            data: [<Fragment key="SlidePlaces" />],
        },
    ]

    const subTitles = new Map<string,string>([
    ])

    const titles = new Map<string,string>([
    ])

    return (
        <>
            <SectionContainer
                sections={sections}
                stickySectionHeadersEnabled={false}
                renderSectionHeader={({ section: { title } }: any) => {
                    return (
                        <>
                            <Subtitle>{subTitles.get(title)}</Subtitle>
                            <Title>{titles.get(title)}</Title>
                        </>
                    )}
                }
                renderItem={({ item }: any) => <Renders>{item}</Renders>}
                // ListHeaderComponent={(
                //     <StickBanner imageUrl={require('../../../assets/images/sample-place.png')} />
                // )}
            />
        </>
    )
}

export default Home
