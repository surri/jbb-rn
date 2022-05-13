import React, { useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import TextStyles from '../../components/styled/TextStyles'

const PostContainer = styled.FlatList`
    padding: 0 24px;
`

const PostTitleContainer = styled.View`
    margin: 32px 0;
`

const PostTitle = styled(TextStyles.Regular)`
    margin-top: 8px;
    color: #333;
`

interface Post {
    title: string;
    writer: string;
    date: string;
}

interface IState {
    posts: Post[];
}

const Notice: React.FC = () => {

    const [posts, SetPosts] = useState([
        {
            title: '제1회 전국대학배드민턴 대회-남복3부 대회가 시작되었습니다. 대회홈페이지 안내드립니다. 환 대회홈페이지 안내드립니다. 환 대회홈페이지 안내드립니다. 환 대회홈페이지 안내드립니다. 환',
            writer: '공지',
            date: '12시간전',
        },
        {
            title: '제1회 전국대학배드민턴 대회 접수공지',
            writer: '공지',
            date: '2021-02-20',
        },
        {
            title: '이거 안되는데 접수 신고여기다가 하면되는건가요??1:1게시판에다가 물어봐야하는건가요?잘...',
            writer: '홍길순',
            date: '12시간전',
        },
        {
            title: '이거 안되는데 접수 신고여기다가 하면되는건가요??1:1게시판에다가 물어봐야하는건가요?잘...',
            writer: '홍길빵',
            date: '2021-02-20',
        },
    ])

    return (
        <PostContainer
            data={posts}
            renderItem={({ item, index })=> {
                return (
                    <View key={index}>
                        {/* {index > 0 && <PartitionPost />}
                        <PostCard
                            post={item}
                        /> */}
                    </View>
                )
            }}
            ListHeaderComponent={() => {
                return (
                    <PostTitleContainer>
                        <PostTitle>공지사항</PostTitle>
                    </PostTitleContainer>
                )
            }}
        />
    )
}
export default Notice
