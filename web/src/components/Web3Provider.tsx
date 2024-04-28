

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from "wagmi";
import { projectId, metadata, chains } from '@/config/provider.config'


const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
createWeb3Modal({ wagmiConfig, projectId, themeMode: 'light' });

export default function App({ children }: any) {
    return (
        <WagmiProvider config={wagmiConfig}>
            {children}
        </WagmiProvider>
    );
}
