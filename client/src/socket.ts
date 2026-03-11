import { io } from 'socket.io-client'

// En enda socket-instans för hela appen
export const socket = io('http://localhost:3002', {
  autoConnect: false,
})
