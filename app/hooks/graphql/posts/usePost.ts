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

type Virables = {
    id: number,
    userId: number
}

export default function usePostShow(variables: Virables) {
    return useQuery(POST_QUERY, { variables })
}