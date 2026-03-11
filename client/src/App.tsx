import useChatStore from './store/chatStore'
import UsernameForm from './components/UsernameForm'
import Chat from './components/Chat'

export default function App() {
  const connected = useChatStore((state) => state.connected)
  return connected ? <Chat /> : <UsernameForm />
}
