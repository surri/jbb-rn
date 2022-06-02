
import { gql, useMutation } from '@apollo/client'

const REMOVE_USER = gql`
    mutation removeUser() {
        removeUser {
            userId, blockUserId, block
        }
    }
`
export default function useRemoveUser() {
    return useMutation(REMOVE_USER)
}