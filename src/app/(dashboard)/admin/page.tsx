"use client"
import UserCard from "@/components/UserCard";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = () => {
  const [lengthDataUji,setLengthDatauji] = useState<number>(0);
  const [lengthDataLatih,setLengthDataLatih] = useState<number>(0);
  const [lengthRasioUji,setDataRasioUji] = useState<number>(0);
  const [lengthRasioLatih,setDataRasioLatih] = useState<number>(0);


  useEffect(() => {
    const datauji = localStorage.getItem('dataTesting')
    const datalatih = localStorage.getItem('dataTraining')
    const dataRasioTraining = localStorage.getItem('dataRasioTraining')
    const dataRasioLatih = localStorage.getItem('dataRasioTesting')

    if(datauji && datalatih) {
      const parsedUji = JSON.parse(datauji);
      const parsedLatih = JSON.parse(datalatih);

      setLengthDatauji(parsedUji.length)
      setLengthDataLatih(parsedLatih.length)
      setDataRasioLatih(Number(dataRasioLatih))
      setDataRasioUji(Number(dataRasioTraining))
    }
  },[])

  const sum = lengthDataLatih + lengthDataUji

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* User Card */}
      <div className="w-full flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">

          <UserCard type={"Data Training"} value={lengthDataUji} addTitle={lengthRasioUji+`%`}/>
          <UserCard type={"Data Testing"} value={lengthDataLatih} addTitle={lengthRasioLatih+`%`}/>
          <UserCard type={"Data Total"} value={sum} />
        </div>
      </div>
    </div>
  );
};

export default Page;
