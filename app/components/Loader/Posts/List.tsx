import { Fragment } from 'react'
import ContentLoader, { Circle, Rect } from 'react-content-loader/native'

const List = ({ rows = 1 }: { rows: number }) => {
    return (
        <Fragment>
            {[...Array(rows).keys()].map(count => {
                return (
                    <ContentLoader
                        key={count.toString()}
                        height={120}
                        speed={1}
                        viewBox="0 0 380 100"
                    >
                        <Rect x="20" y="17" rx="4" ry="4" width="100" height="100" />
                        <Rect x="140" y="20" rx="4" ry="4" width="200" height="16" />
                        <Rect x="140" y="48" rx="3" ry="3" width="200" height="16" />
                        <Circle cx="156" cy="90" r="16" />
                        <Rect x="184" y="82" rx="3" ry="3" width="156" height="16" />
                    </ContentLoader>
                )
            })}
        </Fragment>
    )
}

export default List