import axios from "axios";
import { useEffect, useState } from "react"

const UseFectch = (url : string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData,setApiData] = useState(null);
    const [isError,setIsError] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const resp = await axios.get(url);
                const data = await resp?.data;

                setApiData(data)
                setIsLoading(false)
            } catch (error: any) {
                setIsError(error)
                setIsLoading(false)
            }
        }

        fetchData()
    },[url])
  return { isLoading, apiData, isError}
}

export default UseFectch