import { gql, useQuery } from '@apollo/client'

const POST_QUERY = gql`
    query usePostShow($id: ID!) {
        post(id: $id) {
            id
            title
            contents
            comments {
                id
                userId
            }
        }
    }
`

type Variables = {
    id: number,
    userId: number
}

export default function usePostShow(variables: Variables) {
    return useQuery(POST_QUERY, { variables })
}