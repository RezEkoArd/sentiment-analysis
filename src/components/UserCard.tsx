import Image from "next/image"

const UserCard = ({type} : {type:String}) => {
  return (
    <div className='rounded-2xl odd:bg-lightPurple even:bg-picton-blue-300 p-4 flex-1 min-w-[150px]'>
        <div className="flex justify-between align-center">
            <span>{type}</span>
            <Image src="/more.png" alt="" width={20} height={20} />
        </div>
        <h1 className="text-2xl font-semibold my-4">1,2345</h1>
    </div>
  )
}

export default UserCard