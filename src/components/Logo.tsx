import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 hover:text-blue-500 transition-colors">
      <div className="rounded-full overflow-hidden">
        <Image src="/logo.jpg" alt="logo" width={30} height={30} />
      </div>
      <h1 className="text-xl font-bold">Dapfy</h1>
    </div>
  );
};

export default Logo;
