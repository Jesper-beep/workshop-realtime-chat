import { useState } from 'react'
import useChatStore from '../store/chatStore'
import { socket } from '../socket'

export default function UsernameForm() {
  const [input, setInput] = useState('')


  const setUsername = useChatStore((state) => state.setUsername)
  const setConnected = useChatStore((state) => state.setConnected)

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    // Om användaren inte har ett namn, returnera
    if (!input.trim()) return
    // Om användaren inte har ett namn, sätt det till "Anonym"
    if (!input.trim()) {
      setUsername('Anonym')
      return
    }
    // Om användaren har ett namn, sätt det till det
    setUsername(input.trim())

    // Lyssna på om socketen är ansluten
    socket.once('connect', () => {
      console.log('socket connected!')
      console.log('username:', input.trim());
      setConnected(true)
    })
    // Om anslutningen misslyckas, logga felet
    socket.on('connect_error', (err) => console.error('connect_error:', err))
    // Anslut till socketen
    socket.connect()
    // Logga om socketen är ansluten
    console.log('socket.connected:', socket.connected)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleJoin}
        className="bg-white p-8 shadow-md flex flex-col gap-4 w-80"
      >
        <h1 className="text-2xl font-bold text-gray-800">Gå med i chatten</h1>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ditt namn..."
          className="px-4 py-2 border border-gray-200 border-[0.5px] focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
        <button
          type="submit"
          className="px-4 py-2 transition font-semibold" style={{ backgroundColor: '#2B302E', color: '#AFD75E' }}
        
        >
          Anslut
        </button>
      </form>
    </div>
  )
}
