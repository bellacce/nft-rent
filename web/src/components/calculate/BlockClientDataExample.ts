import { client } from './BlockClientData'


// 使用 Viem 编写 ts 脚本查询Ethereum链上最近100个区块链内的 USDC Transfer记录，要求如下：

// 按格式输出转账记录：
// 从 0x099bc3af8a85015d1A39d80c42d10c023F5162F0 转账给 0xA4D65Fd5017bB20904603f0a174BBBD04F81757c 99.12345 USDC ,
// 交易ID：0xd973feef63834ed1e92dd57a1590a4ceadf158f731e44aa84ab5060d17336281

const filter = async () => {
    // await publicClient.createEventFilter({
    //     address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2'
    // })
    const blockNumber = await client.getBlockNumber()
    console.log(blockNumber); // 输出: Delayed Hello! (在等待2秒后输出)

    return blockNumber;
    // do smt with bar
};

filter().then(result => {
    console.log(result); // 输出: Delayed Hello! (在等待2秒后输出)
});

