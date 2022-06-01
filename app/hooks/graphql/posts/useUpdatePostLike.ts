import { gql, useMutation } from '@apollo/client'

const UPDATE_POST_LIKE = gql`
    mutation updatePostsLike($postId: Int!) {
        updatePostsLike(
            postId: $postId,
        ) {
            postId, likes, like
        }
    }
`
export default function useUpdatePostsLike() {
    return useMutation(UPDATE_POST_LIKE)
}