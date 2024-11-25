import Image from "next/image"
import { useState } from "react"

const TableSearch = () => {
  const [query,setQuery] = useState('');

  return (
    <div className='w-full md:w-auto flex items-center gap-2 rounded-full text-xs ring-[1.5px] ring-gray-300 px-2'>
        <Image src="/search.png" alt="" width={14} height={14}/>
        <input type="text" placeholder="Search ..." className="w-[200px] p-2 bg-transparent outline-none" onChange={(e) => setQuery(e.target.value)} value={query} />
    </div>
  )
}

export default TableSearch