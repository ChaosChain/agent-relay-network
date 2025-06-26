import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import { useWebSocketImplementation } from 'nostr-tools/pool'
import { WebSocket } from 'ws'
useWebSocketImplementation(WebSocket)
import { SimplePool } from 'nostr-tools/pool'
import { fetchRelayInformation } from 'nostr-tools/nip11'

async function main() {
  const pool = new SimplePool();
  const relays = ['http://127.0.0.1:3332', 'http://127.0.0.1:3333'];

  let sk = generateSecretKey();
  let pk = getPublicKey(sk);


  // Subscription with an onevent callback
  pool.subscribe(
    [relays[0]],
    {
      kinds: [1]
    },
    {
      onevent(event) {
        console.log(`Received event from relay 1 ${relays[0]}):`, event);
      }
    }
  );

  // Subscription with an onevent callback
  pool.subscribe(
    [relays[1]],
    {
      kinds: [1]
    },
    {
      onevent(event) {
        console.log(`Received event from relay 2 ${relays[1]}):`, event);
      }
    }
  );

  // // this assigns the pubkey, calculates the event id and signs the event in a single step
  // const signedEvent = finalizeEvent(eventTemplate, sk)
  // await Promise.all(pool.publish(['http://127.0.0.1:3331'], signedEvent))

  // relay.close()
}

await main().catch(console.error);