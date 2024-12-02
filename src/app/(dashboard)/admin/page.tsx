"use client"

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import UserCard from "@/components/UserCard";
import Image from "next/image";
import { sentimentData } from "@/lib/data";

type Sentiment = {
  id: number;
  waktu: string;
  username: string;
  score: number;
  content: string;
};

const columns = [
  {
    header: "No",
    accessor: "no",
  },
  {
    header: "Username",
    accessor: "username",
    className: "hidden md:table-cell",
  },
  {
    header: "Komentar",
    accessor: "komentar",
    className: "hidden md:table-cell",
  },
  {
    header: "Sentiment",
    accessor: "sentiment",
    className: "hidden md:table-cell",
  },
];

const Page = () => {
  const renderRow = (item: Sentiment, index: number) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{index + 1}</h3>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.content}</td>
      <td className="hidden md:table-cell">{item.score}</td>

      {/* <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>

        
        </div>
      </td> */}
    </tr>
  );

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* User Card */}
      <div className="w-full flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type={"Kata Dasar"} />
          <UserCard type={"Data Latih"} />
          <UserCard type={"Data Uji"} />
        </div>
      </div>
    </div>
  );
};

export default Page;
