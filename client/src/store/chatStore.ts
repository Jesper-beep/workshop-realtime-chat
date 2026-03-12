import { create } from 'zustand'
import { socket } from '../socket'

type Message = {
  id: string
  user: string
  text: string
  timestamp: number
}

type ChatState = {
  messages: Message[]
  username: string
  connected: boolean
  setUsername: (name: string) => void
  setConnected: (value: boolean) => void
  addMessage: (message: Message) => void
  sendMessage: (text: string) => void
}

const useChatStore = create<ChatState>()((set, get) => ({
  // State
  messages: [],
  username: '',
  connected: false,

  // Actions
  setUsername: (name) => set({ username: name }),

  setConnected: (value) => set({ connected: value }),

  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

  sendMessage: (text) => {
    const { username } = get()
    const message: Message = {
      id: crypto.randomUUID(),
      user: username,
      text,
      timestamp: Date.now(),
    }
    socket.emit('message', message)
  },
}))

export default useChatStore

 