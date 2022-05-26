import { gql, useQuery } from '@apollo/client'

const POST_QUERY = gql`
    query usePost($id: ID!) {
        post(id: $id) {
            id
            title
            contents
            comments {
                id
                userId
            }
            userId
        }
    }
`

type Variables = {
    id: number,
}

export default function usePost(variables: Variables) {
    return useQuery(POST_QUERY, { variables })
}