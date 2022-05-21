import { gql, useQuery } from '@apollo/client'

const POSTS_QUERY = gql`
    query usePosts($sportsId: Int, $keyword: String) {
        posts(
            sportsId: $sportsId
            conditions:{
                pagination: {
                    first: 10
                }
                keyword: $keyword
            }
        ) {
            edges {
                node {
                    id
                    title
                    author
                    createdAt
                }
                cursor
            }
            pageInfo {
                startCursor
                endCursor
                hasPrevPage
                hasNextPage
            }
        }
    }
`

type Variables = {
    sportsId: number,
    keyword: string,
}

export default function usePosts(variables: Variables) {
    return useQuery(POSTS_QUERY, { variables })
}