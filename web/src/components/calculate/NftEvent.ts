import { createPublicClient, webSocket, parseAbiItem, http } from "viem";
import { mainnet } from "viem/chains";

import {
    parseAbi,
    encodePacked,
    decodeAbiParameters,
    encodeAbiParameters,
} from "viem"
import { filter, forEach } from "lodash";
import { resolve } from "path";

export const PARTICLE_NETWORK_NODE = process.env.PARTICLE_NETWORK_NODE;

//需求内容：
// 监控 NFTFactory 合约 event NFTCreated(address nftCA); 事件中所有新部署的 nft 合约。
// 最终将事件中的 nft 合约下用户持仓信息记录到 TheGraph中，用户NFT持仓表对象如下

//设置基础基准信息
const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const nftCreatedEvent = "event NFTCreated(address nftCA)";

const client = createPublicClient({
    chain: mainnet,
    // transport: webSocket("wss://eth-mainnet.g.alchemy.com/v2/v1AOvdju7jkXJwLFiFrYWsICKizHvjvR"),
    transport: http(PARTICLE_NETWORK_NODE)
});


async function main() {
    let startBlock = await client.getBlockNumber();
    startBlock = startBlock - BigInt(100);
    let num = 0;
    for (let i = 0; i < 10; i++) {
        const currentBlock = await client.getBlockNumber();
        const endBlock = await client.getBlockNumber() + BigInt(10);

        //不采集最新的3个区块的数据，需要等数据稳定在获取
        if (startBlock > currentBlock - BigInt(3)) {
            console.log("需要等一等，在获取数据 currentBlock " + currentBlock);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            continue;
        }
        console.log("采集区块： " + startBlock + "," + endBlock);
        const filter = await client.createEventFilter({
            address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            event: parseAbiItem("event Transfer(address indexed from, address indexed to,uint256 value)"),
            fromBlock: startBlock,
            toBlock: endBlock
        });
        startBlock = endBlock + BigInt(1);
        const logs = await client.getFilterLogs({ filter });

        //// 从  转账给  99.12345 USDC ,
        // 交易ID：0xd973feef63834ed1e92dd57a1590a4ceadf158f731e44aa84ab5060d17336281
        logs.forEach((log) => {
            console.log(
                ` ${num} 从 ${log.args.from} 转账给 ${log.args.to} 金额:${log.args.value! / BigInt(1e6)} USDC, ${log.transactionHash}
            ` );
            num++;
        })
    }

}

main().catch((err) => console.log(err));