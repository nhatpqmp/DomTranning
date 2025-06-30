import { useEffect, useState } from 'react';

function useFetchApi({ url }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);

    async function fetchData() {
        try {
            setLoading(true);
            const response = await fetch(url);
            const json = await response.json();
            setData(json.data || []);
            setFetched(true);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, setData, loading, fetched };
}

export default useFetchApi;
