import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { useWebSocketImplementation } from 'nostr-tools/pool';
import { SimplePool } from 'nostr-tools/pool';
import { logger } from '@elizaos/core';

// You can change this to any public relay
const pool = new SimplePool();
const relays = ['http://127.0.0.1:3333', 'http://127.0.0.1:3332'];

export async function main(content) {
  //   let's publish a new event while simultaneously monitoring the relay for it
  let sk = generateSecretKey();
  let pk = getPublicKey(sk);

  let eventTemplate = {
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content: content,
  };
  // this assigns the pubkey, calculates the event id and signs the event in a single step
  const signedEvent = finalizeEvent(eventTemplate, sk);

  // console.log the published event
  logger.info('published event:', signedEvent);
  await Promise.all(pool.publish(relays, signedEvent));
  // relay.close();
}
