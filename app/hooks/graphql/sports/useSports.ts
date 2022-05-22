import { gql, useQuery } from '@apollo/client'

const SPORTS_QUERY = gql`
    query {
        sports {
            id,
            name,
            nameKR,
            description,
        }
    }
`

export default function useSports() {
    return useQuery(SPORTS_QUERY)
}