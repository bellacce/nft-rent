export default function ConnectButton() {
  return (
    <div className="flex gap-[10px] items-center connectBtn">
      <div>
        <w3m-network-button />
      </div>
      <div>
        <w3m-button />
      </div>
    </div>
  );
}
