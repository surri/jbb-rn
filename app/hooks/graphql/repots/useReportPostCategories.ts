import { gql, useQuery } from '@apollo/client'

const REPORT_POST_CATEGORIES = gql`
    query {
        reportPostCategories {
            id
            title
        }
    }
`

export default function useSports() {
    return useQuery(REPORT_POST_CATEGORIES)
}