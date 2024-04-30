import { createWalletClient, custom } from 'viem'
 
// Retrieve Account from an EIP-1193 Provider.
const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
})
 
export const walletClient = createWalletClient({
  account,
  transport: custom(window.ethereum!)
})