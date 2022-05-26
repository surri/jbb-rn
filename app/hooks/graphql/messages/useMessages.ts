import { gql, useQuery } from '@apollo/client'

const MESSAGES_QUERY = gql`
    query useMessages($chatId: Int) {
        messages(
            chatId: $chatId
            conditions:{
                pagination: {
                    first: 4
                }
            }
        ) {
            edges {
                node {
                    id
                    createdAt
                    message
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
}

export default function useMessages(variables: Variables) {
    return useQuery(MESSAGES_QUERY, { variables })
}