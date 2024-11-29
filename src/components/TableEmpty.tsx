import Image from "next/image"

const TableEmpty = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-10'>
        <Image src="/empty-box.png" alt="" width={250} height={250}/>
        <h1 className="font-semibold text-lg">Data Table Masih Kosong</h1> 
    </div>
  )
}

export default TableEmpty