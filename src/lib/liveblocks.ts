import { createClient } from '@liveblocks/client';

const client = createClient({
  publicApiKey: 'YOUR_LIVEBLOCKS_PUBLIC_KEY', // Replace with your Liveblocks public key
});

export function useLiveblocks() {
  const room = client.enter('miro-clone');
  
  return {
    room,
  };
}