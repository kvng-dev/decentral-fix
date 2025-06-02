import Image from "next/image";
import WalletDialog from "./wallet-dialog";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/5 w-full  h-fit z-50">
      <div className="p-4 flex justify-between max-w-7xl mx-auto">
        <div className=" bg-blue-500 rounded-lg p-1">
          <Image
            alt="logo"
            src="/startup.png"
            width={300}
            height={300}
            className="w-8 h-8 object-cover"
          />
        </div>

        <WalletDialog>
          <Button className="w-fit px-12 py-6 bg-gradient-to-r from-blue-700 to-blue-500 font-bold ">
            Connect
          </Button>
        </WalletDialog>
      </div>
    </div>
  );
};
export default Navbar;
