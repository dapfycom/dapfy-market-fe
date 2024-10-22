import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 hover:text-blue-500 transition-colors">
      <div className="rounded-full overflow-hidden">
        <Image src="/logo.jpg" alt="logo" width={32} height={32} />
      </div>
      <h1 className="text-xl font-semibold">Dapfy</h1>
    </div>
  );
};

export default Logo;
