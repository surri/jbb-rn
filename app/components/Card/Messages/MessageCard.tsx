import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../../../types/navigation'
import { View } from '../../Themed'
import { useTheme } from '@react-navigation/native'
import moment from 'moment'
import styled from 'styled-components/native'
import TextStyles from '../../styled/TextStyles'

interface IProps {
    message: any
}

const MessageCard: React.FC<IProps> = ({ message }: IProps) => {
    // const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
    const {
        node: {
            mine,
            createdAt,
            message: contents,
            unread,
        },
    } = message

    const theme = useTheme()

    return mine ? (
        <MessageContainer mine={mine}>
            <MessageBox backgroundColor={theme.colors.active}>
                <MessageText color={theme.colors.background}>
                    {contents}
                </MessageText>
            </MessageBox>
            {unread && unread > 0 && <Readed>안읽음</Readed>}
            {/* <Readed>{!sended && '전송실패'}{lastid == id && '안읽음'}</Readed> */}
            <ReceivedTime>{moment(createdAt).format('A hh:mm')}</ReceivedTime>
        </MessageContainer>
    ) : (
        <MessageContainer mine={mine}>
            <MessageBox backgroundColor={theme.colors.inactive}>
                <MessageText color={theme.colors.text}>
                    {contents}
                </MessageText>
            </MessageBox>
            <ReceivedTime>{moment(createdAt).format('A hh:mm')}</ReceivedTime>
        </MessageContainer>
    )

}

type StyledMessage = {
    mine?: boolean,
    color?: string,
    borderColor?: string,
    backgroundColor?: string,
}

const MessageContainer = styled.View`
    flex-direction: ${(props: StyledMessage) => props.mine ? 'row-reverse' : 'row'};
    align-self: ${(props: StyledMessage) => props.mine ? 'flex-end' : 'flex-start'};
    align-items: flex-end;
    flex-wrap: wrap;
    margin: 8px 12px;
`

const MessageBox = styled.View`
    background-color: ${(props: StyledMessage) => props.backgroundColor};
    padding: 12px;
    border-radius: 24px;
`

const MessageText = styled(TextStyles.Medium)`
    color: ${(props: StyledMessage) => props.color};
`

const ReceivedTime = styled(TextStyles.Medium)`
    color: ${(props) => props.theme.colors.placeHolder};
    margin: 4px;
`

const Readed = styled(TextStyles.Medium)`
    font-size: 10px;
    align-self: flex-end;
    margin: 0 24px;
    color: ${(props) => props.theme.colors.placeHolder};
`

export default MessageCard