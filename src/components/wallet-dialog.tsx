import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ReactNode } from "react";
import WalletCard from "./wallet-card";

const wallets = [
  { name: "Wallet Connect", type: "qr code", logo: "/wallet-connect.webp" },
  { name: "MetaMask", type: "installed", logo: "/meta.svg" },
  { name: "Coinbase Wallet", logo: "/coin.svg" },
  { name: "Phantom", logo: "/phantom.png" },
  { name: "Trust Wallet", logo: "/trust.svg" },
  { name: "Browser Wallet", logo: "/browser.webp" },
  { name: "Other Wallets", count: 410, logo: "/menu.png" },
];

const WalletDialog = ({ children }: { children?: ReactNode }) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[375px] bg-gray-900 border-0 transition-all duration-500 ease-in-out">
          <DialogHeader>
            <DialogTitle className="text-center">Connect Wallet</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 font-sans">
            {wallets.map((wallet) => (
              <WalletCard key={wallet.name} wallet={wallet} />
            ))}
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default WalletDialog;
