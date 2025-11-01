import HeroGetInvolved from "@/sections/get-involved/overview/HeroGetInvolved";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <HeroGetInvolved/>
        {children}
    </div>
    
  );
}
