import { gql, useMutation } from '@apollo/client'

const UPDATE_USER_BLOCK = gql`
    mutation updateUserBlock($blockUserId: Int!) {
        updateUserBlock(
            blockUserId: $blockUserId,
        ) {
            userId, blockUserId, block
        }
    }
`
export default function useUpdateUserBlock() {
    return useMutation(UPDATE_USER_BLOCK)
}