import { gql, useQuery } from '@apollo/client'

const USER_DELETE_CATEGORIES = gql`
    query {
        userDeleteCategories {
            id
            title
        }
    }
`

export default function useUserDeleteCategories() {
    return useQuery(USER_DELETE_CATEGORIES)
}