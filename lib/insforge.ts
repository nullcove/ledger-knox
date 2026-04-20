import { createClient } from '@insforge/sdk';

const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL || '';
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '';

console.log('InsForge Client Init:', { baseUrl, hasAnonKey: !!anonKey });

export const insforge = createClient({
  baseUrl,
  anonKey
});

if (typeof window !== 'undefined') {
  console.log('InsForge Client Ready (Window context)');
}
