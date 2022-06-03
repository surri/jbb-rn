import { gql, useMutation } from '@apollo/client'

const CREATE_REPORT_POST = gql`
    mutation createReportPost($input: CreateReportInput!) {
        createReportPost(
            input: $input
        )
    }
`
export default function useCreateReportPost() {
    return useMutation(CREATE_REPORT_POST)
}