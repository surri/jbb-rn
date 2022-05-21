import { gql, useMutation } from '@apollo/client'

const SEND_AUTH_SMS = gql`
    mutation authNumber($phone: String!) {
        authNumber(phone: $phone)
    }
`

export default function useAuthNumber() {
    return useMutation(SEND_AUTH_SMS)
}