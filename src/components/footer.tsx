import Image from "next/image";

const Footer = () => {
  return (
    <footer className="h-24 backdrop-blur-md flex items-center justify-center bg-white/5">
      <div className=" bg-blue-500 rounded-lg p-1">
        <Image
          alt="logo"
          src="/startup.png"
          width={300}
          height={300}
          className="w-8 h-8 object-cover"
        />
      </div>
    </footer>
  );
};
export default Footer;
