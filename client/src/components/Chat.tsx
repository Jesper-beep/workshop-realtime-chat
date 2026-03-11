import { useEffect, useRef, useState } from 'react'
import useChatStore from '../store/chatStore'
import { socket } from '../socket'

export default function Chat() {
  const messages = useChatStore((state) => state.messages)
  const username = useChatStore((state) => state.username)
  const addMessage = useChatStore((state) => state.addMessage)
  const sendMessage = useChatStore((state) => state.sendMessage)

  const [input, setInput] = useState('')

  // Används endast en gång vid start
  useEffect(() => {
    // Lyssna på inkommande meddelanden och lägg till i storen
    socket.on('message', addMessage)
    // Städa upp när komponenten unmountas
    return () => { socket.off('message', addMessage) }
  }, [])


  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    // Om inputen inte är ren, returnera  
    if (!input.trim()) return
    // Skicka meddelandet
    sendMessage(input.trim())
    // Rensa inputfältet
    setInput('')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-lg bg-white shadow-md flex flex-col h-[600px]">

        <div className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-800">Chatt</h1>
          <p className="text-sm text-gray-400">Inloggad som <span className="font-medium" style={{ color: '#2B302E' }}>{username}</span></p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          {messages.map((msg) => {
            const isOwn = msg.user === username
            return (
              <div key={msg.id} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                <span className="text-xs text-gray-400 mb-1">{msg.user}</span>
                <div className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                  isOwn
                    ? 'rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`} style={isOwn ? { backgroundColor: '#2B302E', color: '#AFD75E' } : {}}>
                  {msg.text}
                </div>
              </div>
            )
          })}
        </div>

        <form onSubmit={handleSend} className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Skriv ett meddelande..."
            className="flex-1 px-4 py-2 border border-gray-200 border-[0.5px] focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 transition text-sm font-semibold"
            style={{ backgroundColor: '#2B302E', color: '#AFD75E' }}
          >
            Skicka
          </button>
        </form>

      </div>
    </div>
  )
}
