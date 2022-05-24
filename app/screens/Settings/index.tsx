import React, { useEffect, useState } from 'react'
import { Container } from './styled'
import io from 'socket.io-client'

const socketEndpoint = 'http://localhost:4000/messages'

const Main: React.FC = () => {
    const [hasConnection, setConnection] = useState(false)
    const [time, setTime] = useState<string | null>(null)

    useEffect(() => {
        const socket = io(socketEndpoint, {
            transports: ['websocket'],
        })

        socket.io.on('open', () => setConnection(true))
        socket.io.on('close', () => setConnection(false))

        socket.on('msg', (data) => {
            console.log(data.message)
        })

        socket.on('time-msg', (data) => {
            setTime(new Date(data.time).toString())
        })

        console.log('fasdf')
        socket.emit('msg', { type: 'msg', socketId: socket.id, msg: 'fasdfasdf' })

        return () => {
            socket.disconnect()
            socket.removeAllListeners()
        }
    }, [])

    return (
        <Container>
        </Container>
    )
}

export default Main
