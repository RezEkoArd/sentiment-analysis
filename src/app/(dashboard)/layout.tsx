'use client';
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  
  useEffect(() => {
    const middlewareDashboard = () => {
      const x = localStorage.getItem('isLogin')
      if(!x) {
        router.push('/login');
      }
    }
    
    middlewareDashboard();
  },[])
  const router = useRouter();

  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2 p-4"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-semibold">
            SentimentAnalysis
          </span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-neutral-50  overflow-x-hidden overscroll-y-contain flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
