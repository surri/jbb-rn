import { gql, useQuery } from '@apollo/client'

const PROFILE_QUERY = gql`
    query {
        profile {
            id
            username
            displayName
            email
            phone
        }
    }
`

export default function useProfile() {
    return useQuery(PROFILE_QUERY)
}