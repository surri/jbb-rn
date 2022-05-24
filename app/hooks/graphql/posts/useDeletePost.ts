import { gql, useMutation } from '@apollo/client'

const DELETE_POST = gql`
    mutation deletePost($id: Int!) {
        deletePost(
            id: $id
        )
    }
`
export default function useDeletePost() {
    return useMutation(DELETE_POST)
}