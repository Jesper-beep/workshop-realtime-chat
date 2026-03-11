import { Server, Socket } from 'socket.io'

const io = new Server(3002, {
  cors: { origin: '*' },
})

io.on('connection', (socket: Socket) => {
  console.log('Användare ansluten:', socket.id)

  socket.on('message', (message: any) => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('Användare frånkopplad:', socket.id)
  })
})

console.log('Server kör på port 3002')

