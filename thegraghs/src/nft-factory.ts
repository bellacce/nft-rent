import { BigInt } from "@graphprotocol/graph-ts"
import {
  NFTCreated as NFTCreatedEvent,
  NFTRegesitered as NFTRegesiteredEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/NFTFactory/NFTFactory"
import {
  NFTCreated,
  NFTRegesitered,
  OwnershipTransferred,
  TokenInfo
} from "../generated/schema"

import { Transfer as TransferEvent, NFTData } from "../generated/NFTData/NFTData"
import { Address } from "@graphprotocol/graph-ts"
import { NFTData as DataSourcePool } from "../generated/templates"


//在 Sepolia 网络中利用 TheGraph 存储NFT的用户持仓信息，要求如下：

// 监控 NFTFactory 合约 event NFTCreated(address nftCA); 事件中所有新部署的 nft 合约。
// 最终将事件中的 nft 合约下用户持仓信息记录到 TheGraph中，用户NFT持仓表对象如下：

export function handleNFTCreated(event: NFTCreatedEvent): void {
  let entity = new NFTCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftCA = event.params.nftCA

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  //NFTData.
  DataSourcePool.create(event.params.nftCA)
}

export function handleTransfer(event: TransferEvent): void {
  let entity: TokenInfo | null;
  if (event.params.from.equals(Address.zero())) {
    entity = new TokenInfo(
      event.address.toHexString().concat(event.params.tokenId.toString())
    )
  } else {
    entity = TokenInfo.load(event.address.toHexString().concat(event.params.tokenId.toString()))
  }
  if (entity == null) {
    return;
  }
  entity.ca = event.address;
  entity.tokenId = event.params.tokenId;
  let nft = NFTData.bind(event.address);
  entity.tokenURL = nft.tokenURI(event.params.tokenId);
  entity.name = nft.name()
  entity.owner = event.params.to;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();
}


function upodateTokenInfo(entity: NFTCreated, event: NFTCreatedEvent): void {
  //获取nft
  let nftAddrInfo = TokenInfo.load(entity.id + "");
  //let nftAddrInfo;
  if (nftAddrInfo) {
    // nftAddrInfo.
  } else {
    // nftAddrInfo = new TokenInfo(entity.id+"");
    // nftAddrInfo.id = entity.blockTimestamp;
    // nftAddrInfo.ca = entity.blockTimestamp;
    // nftAddrInfo.tokenId = entity.blockTimestamp;
    // nftAddrInfo.tokenURL = entity.blockTimestamp;
    // nftAddrInfo.name = entity.blockTimestamp;
    // nftAddrInfo.owner = entity.blockTimestamp;


    // nftAddrInfo.transactionHash = entity.transactionHash;
    // nftAddrInfo.blockNumber = entity.blockNumber;
    // nftAddrInfo.blockTimestamp = entity.blockTimestamp;
    //


  }
  //event.receipt
  // let fromAddr = event.receipt;
  //action
  //TokenInfo.
}

export function handleNFTRegesitered(event: NFTRegesiteredEvent): void {
  let entity = new NFTRegesitered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftCA = event.params.nftCA

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
