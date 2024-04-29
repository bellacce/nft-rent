import { createPublicClient, http } from 'viem'
import { zora } from 'viem/chains'

export const client = createPublicClient({
  chain: zora,
  transport: http()
})