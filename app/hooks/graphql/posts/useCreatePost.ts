import { gql, useMutation } from '@apollo/client'

const CREATE_POST = gql`
    mutation updateUser($input: CreatePostInput!) {
        createPost(
            input: $input
        ) {
            title, contents
        }
    }
`
export default function useCreatePost() {
    return useMutation(CREATE_POST)
}