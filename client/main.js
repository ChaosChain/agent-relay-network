"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nostr_tools_1 = require("nostr-tools");
// You can change this to any public relay
const RELAY_URL = 'http://127.0.0.1:8008';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Generate a new keypair (for demo purposes)
        const sk = (0, nostr_tools_1.generateSecretKey)();
        const pk = (0, nostr_tools_1.getPublicKey)(sk);
        console.log('Generated pubkey:', pk);
        // Connect to relay
        const relay = yield nostr_tools_1.Relay.connect(RELAY_URL);
        console.log(`Connected to relay ${RELAY_URL}`);
        // Subscribe to all events from the last 60 seconds
        const sub = relay.subscribe([{ since: Math.floor(Date.now() / 1000) - 60 }], {});
        sub.onevent = (event) => {
            console.log('Received event:', event);
        };
        // // Publish a test event
        // const eventTemplate = {
        //   kind: 1, // text_note
        //   created_at: Math.floor(Date.now() / 1000),
        //   tags: [],
        //   content: 'Hello from nostr-tools client!'
        // };
        // const signed = finalizeEvent(eventTemplate, sk);
        // await relay.publish(signed);
        // console.log('Published event:', signed);
        // Keep the process alive for a while to receive events
        setTimeout(() => {
            relay.close();
            console.log('Closed relay connection.');
            process.exit(0);
        }, 20000);
    });
}
main().catch(console.error);
