
import {
    mainnet,
    sepolia,
} from "wagmi/chains";
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";
export const metadata = {
    name: "Next Starter Template",
    description: "A Next.js starter template with Web3Modal v3 + Wagmi",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
export const chains: any = [
    mainnet,
    sepolia
]