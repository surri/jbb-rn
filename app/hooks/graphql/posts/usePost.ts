import { gql, useQuery } from '@apollo/client'

const POST_QUERY = gql`
    query usePost($id: ID!) {
        post(id: $id) {
            id
            title
            contents
            price
            author
            comments {
                id
                userId
            }
            mine
            userId
            chat {
                id
            }
        }
    }
`

type Variables = {
    id: number,
}

export default function usePost(variables: Variables) {
    return useQuery(POST_QUERY, { variables })
}