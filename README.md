# Workshop – Realtime Chat med Zustand

I den här workshopen bygger du vidare på en grundapp för realtidschatt. Servern och komponenterna är klara — din uppgift är att implementera **Zustand store** och koppla ihop den med komponenterna via **selektors**.

## Arkitektur

Se diagrammet för hur socket, React-komponenter och Zustand store hänger ihop:
[Öppna i FigJam](https://www.figma.com/board/bXRbyDQCzUB8zNMEdRsmz8/Realtime-Chat?node-id=0-1)

## Kom igång

```bash
# Starta servern
cd server && node --watch index.js

# Starta klienten (i ny terminal)
cd client && npm run dev
```

---

## Vad som redan finns

| Fil | Vad den gör |
|-----|-------------|
| `server/index.js` | socket.io-server på port 3002 |
| `client/src/socket.ts` | skapar socket-instansen (autoConnect: false) |
| `client/src/App.tsx` | visar `<UsernameForm>` eller `<Chat>` beroende på `connected` |
| `client/src/components/UsernameForm.tsx` | formulär för att ange namn och ansluta |
| `client/src/components/Chat.tsx` | chattvy med meddelandelista och inputfält |

---

## Din uppgift

### 1. Skapa storen

Skapa filen `client/src/store/chatStore.ts` och definiera state och actions med Zustand:

```ts
import { create } from 'zustand'

const useChatStore = create((set, get) => ({
  // state
  // actions
}))

export default useChatStore
```

**State att implementera:**

```ts
messages: []       // lista med meddelanden
username: ''       // inloggad användare
connected: false   // är socketen ansluten?
```

**Actions att implementera:**

| Action | Vad den ska göra |
|--------|-----------------|
| `setUsername(name)` | uppdatera `username` i state |
| `setConnected(value)` | uppdatera `connected` i state |
| `addMessage(message)` | lägg till ett meddelande i `messages`-listan |
| `sendMessage(text)` | bygg ett meddelande-objekt och skicka via `socket.emit` |

Ett meddelande har formen:
```ts
{
  id: string        // crypto.randomUUID()
  user: string      // hämtas från get().username
  text: string
  timestamp: number // Date.now()
}
```

---

### 2. Koppla storen med selektors

En **selektor** är funktionen du skickar in i `useChatStore` för att läsa ett specifikt värde:

```ts
const username = useChatStore((state) => state.username)
```

Selektorer gör att komponenten bara renderas om när just det värdet ändras.

**Koppla ihop i `UsernameForm.tsx`:**
- Hämta `setUsername` och `setConnected` från storen
- Anropa `setUsername` och `socket.connect()` när formuläret skickas
- Lyssna på `socket.once('connect', ...)` för att sätta `connected: true`

**Koppla ihop i `Chat.tsx`:**
- Hämta `messages`, `username`, `addMessage` och `sendMessage` från storen
- Sätt upp `socket.on('message', addMessage)` i en `useEffect`
- Kom ihåg att städa upp med `socket.off` i cleanup-funktionen
- Anropa `sendMessage` när formuläret skickas

**Koppla ihop i `App.tsx`:**
- Hämta `connected` från storen
- Rendera `<Chat />` om connected, annars `<UsernameForm />`

---

### Bonus

- [ ] Visa tidsstämpel på varje meddelande
- [ ] Lägg till en räknare för antal anslutna användare (kräver server-ändringar)
