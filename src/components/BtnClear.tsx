const BtnClear = () => {
    
    const handleClearData = () => {
        localStorage.clear()
        window.location.reload()
    }  

    return (
    <div className='flex items-center justify-center'>
        <button className="bg-red-500 p-2 hover:bg--500 text-white rounded-lg  hover:shadow-md" onClick={handleClearData}>
            Clear Data
        </button>
    </div>
  )
}

export default BtnClear