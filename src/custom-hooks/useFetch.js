import {useEffect, useState} from "react";

const useFetch = (url, initialValue) => {
    const [result, setResult] = useState(initialValue);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(responseData => {
                if (isMounted) {
                    setResult(responseData);
                    setError(null);
                }
            })
            .catch(error => {
                if (isMounted) {
                    setError(error);
                    setResult(null);
                }
            })
            .finally(() => isMounted && setLoading(false));

        /*cleanup function*/
        return () => (isMounted = false);
    }, [url]);

    return [loading, error, result];
}

export default useFetch;
