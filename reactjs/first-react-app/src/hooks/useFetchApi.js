import {useEffect, useState} from 'react';
function useFetchApi({
                         url
                     }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);

    async function fetchData() {
        try {
            setLoading(true);
            const response = await fetch(url);
            const respData = await response.json();
            setData(respData);
            setFetched(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchData()
    }, []);
    return {
        data,
        setData,
        loading,
        fetched
    }
}

export default useFetchApi;