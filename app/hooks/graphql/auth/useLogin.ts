import { gql, useMutation } from '@apollo/client'

const SEND_AUTH_SMS = gql`
    mutation login($phone: String!, $authNumber: String!) {
        login(
            input: {
                phone: $phone
                authNumber: $authNumber
            }
        ) {
            username, phone, email, displayName, accessToken
        }
    }
`

export default function useLogin() {
    return useMutation(SEND_AUTH_SMS)
}