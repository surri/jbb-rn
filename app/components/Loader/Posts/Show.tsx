import { Fragment } from 'react'
import ContentLoader, { Circle, Rect } from 'react-content-loader/native'

const Show = () => {
    return (
        <Fragment>
            <ContentLoader
                height={320}
                speed={1}
                viewBox="0 0 400 240"
            >
                <Circle cx="60" cy="32" r="32" />
                <Rect x="100" y="4" rx="4" ry="4" width="160" height="20" />
                <Rect x="100" y="36" rx="4" ry="4" width="240" height="20" />
                <Rect x="20" y="80" rx="4" ry="4" width="360" height="240" />
            </ContentLoader>
        </Fragment>
    )
}

export default Show