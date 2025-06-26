import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import { useWebSocketImplementation } from 'nostr-tools/pool'
import { WebSocket } from 'ws'
useWebSocketImplementation(WebSocket)
import { SimplePool } from 'nostr-tools/pool'

async function main() {
const pool = new SimplePool()

const relays = ['http://127.0.0.1:3332', 'http://127.0.0.1:3333']


let sk = generateSecretKey()
let pk = getPublicKey(sk)


pool.subscribe(
  relays,
  {
    kinds: [1]
  },
  {
    onevent(event) {
      console.log('got event:', event)
    }
  }
)

let eventTemplate = {
  kind: 1,
  created_at: Math.floor(Date.now() / 1000),
  tags: [],
  content: 'hello world',
}

// // this assigns the pubkey, calculates the event id and signs the event in a single step
// const signedEvent = finalizeEvent(eventTemplate, sk)
// await Promise.all(pool.publish(['http://127.0.0.1:3331'], signedEvent))

// relay.close()
}

await main().catch(console.error)