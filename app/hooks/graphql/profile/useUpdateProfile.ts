import { gql, useMutation } from '@apollo/client'

const UPDATE_PROFILE = gql`
    mutation updateUser($id: Int!, $input: UpdateUserInput!) {
        updateUser(
            id: $id
            input: $input
        ) {
            displayName
        }
    }
`
export default function useUpdateProfile() {
    return useMutation(UPDATE_PROFILE)
}