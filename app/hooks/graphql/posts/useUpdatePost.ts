import { gql, useMutation } from '@apollo/client'

const EDIT_POST = gql`
    mutation updatePost($id: Int!, $input: UpdatePostInput!) {
        updatePost(
            id: $id,
            input: $input
        ) {
            title, contents
        }
    }
`
export default function useUpdatePost() {
    return useMutation(EDIT_POST)
}