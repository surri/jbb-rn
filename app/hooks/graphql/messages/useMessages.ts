import { gql, useLazyQuery, useQuery } from '@apollo/client'

const MESSAGES_QUERY = gql`
    query useMessages($chatId: Int, $after: String) {
        messages(
            chatId: $chatId
            conditions:{
                pagination: {
                    first: 20
                    after: $after
                }
            }
        ) {
            edges {
                node {
                    id
                    createdAt
                    message
                    mine
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
    chatId: number,
    after?: string,
}

export default function useMessages(variables: Variables) {
    return useLazyQuery(MESSAGES_QUERY, { variables })
}