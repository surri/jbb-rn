import io, { Socket } from 'socket.io-client'
import { createContext, useContext } from 'react'


// const socketEndpoint = 'http://localhost:3000/messages'
const socketEndpoint = 'https://api.jangbibbal.com/messages'

export const socket = io(socketEndpoint, {
    transports: ['websocket'],
})
export const SocketContext = createContext<Socket | null>(null)

export const useSocket =  () => useContext(SocketContext)