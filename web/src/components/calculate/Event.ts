import { createPublicClient, http, webSocket, Filter } from 'viem';
import { mainnet } from 'viem/chains';

import {
    parseAbi,
    parseAbiItem,
    encodePacked,
    decodeAbiParameters,
    encodeAbiParameters,
} from 'viem';

const client = createPublicClient({
    chain: mainnet,
    transport: http("https://rpc.particle.network/evm-chain?chainId=1&projectUuid=6640e582-6ee3-4910-891b-a5564834a219&projectKey=cJIoM9yJEcCMHLosB7fGaemT0Ts11qQDO4uIeeoX"),
});

async function main() {
    let latestBlock = await client.getBlockNumber();
    let endBlock = latestBlock - BigInt(10);
    for (let i = 0; i < 1000; i++) {
        
        const filter = await client.createEventFilter({
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            event: parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)"),
            fromBlock: endBlock,
            toBlock: latestBlock,
        });
        const logs = await client.getFilterLogs({ filter });
        logs.forEach((log) => {
            console.log(
                `从 ${log.args.from} 转账给 ${log.args.to} ${log.args.value! / BigInt(1e6)}USDC,交易ID:${log.transactionHash}`
            );
        });
        
        while(true) {
            //每次获取最新区块信息，直到获取到最新
            latestBlock = await client.getBlockNumber();
            if (latestBlock  > endBlock - BigInt(3)) {
               // console.log("需要等一等，在获取数据 currentBlock " + currentBlock);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                continue;
            }
        }
        
    }



}

main().catch((err) => console.log(err));