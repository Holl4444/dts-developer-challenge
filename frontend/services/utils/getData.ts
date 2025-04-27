import { useState, useEffect } from 'react';

export default function useFetch<T>(url: string): {data: T | undefined, isLoading: boolean} {
    const [ data, setData ] = useState<T>(); // Instance of these states, not shared with other api calls
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        // Handle reloads or new calls mid fetch
        const controller = new AbortController();

        async function apiCall() {
            setIsLoading(true);
            try {
                // Signal sends stop if aborted
              const response = await fetch(url, { signal: controller.signal});

              if (!response.ok) {
                throw new Error(`Error ${response.status}: data not found `);
              }

                const dbData: T = await response.json();
                setData(dbData);
                
            } catch (err) {
              console.error(`Server Error: `, err);
                
            } finally {
                setIsLoading(false);
            }
        }
        apiCall();

        // Clean up triggered on dismount or when url changes - changes signal.
        return () => {
            controller.abort();
        }
    }, [url])

    return { data, isLoading }
}