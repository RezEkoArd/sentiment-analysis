"use client"
import UserCard from "@/components/UserCard";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = () => {
  const [lengthDataUji,setLengthDatauji] = useState<number>(0);
  const [lengthDataLatih,setLengthDataLatih] = useState<number>(0);


  useEffect(() => {
    const datauji = localStorage.getItem('dataTesting')
    const datalatih = localStorage.getItem('dataTraining')

    if(datauji && datalatih) {
      const parsedUji = JSON.parse(datauji);
      const parsedLatih = JSON.parse(datalatih);

      setLengthDatauji(parsedUji.length)
      setLengthDataLatih(parsedLatih.length)
    }
  },[])

  const sum = lengthDataLatih + lengthDataUji

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* User Card */}
      <div className="w-full flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">

          <UserCard type={"Data Training"} value={lengthDataUji} addTitle={`30%`}/>
          <UserCard type={"Data Testing"} value={lengthDataLatih} addTitle={`70%`}/>
          <UserCard type={"Data Total"} value={sum} />
        </div>
      </div>
    </div>
  );
};

export default Page;
