import { gql, useQuery } from '@apollo/client'

const MESSAGES_QUERY = gql`
    query useChatList($after: String) {
        chatList(
            conditions:{
                pagination: {
                    first: 4
                    after: $after
                }
            }
        ) {
            edges {
                node {
                    id
                    updatedAt
                    lastMessage
                    joinedUsers
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
    after?: string,
}

export default function useChatList(variables?: Variables) {
    return useQuery(MESSAGES_QUERY, { variables })
}