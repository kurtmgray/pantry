



// NOT CURRENTLY IN USE 





import {useState} from 'react';

type APIState<T> = {
    data: T | null;
    error: string | null;
    isLoading: boolean;
}

export default function useAPI<T>(initialState: T | null = null): [APIState<T>, (fn: () => Promise<T>) => Promise<void>] {
    const [data, setData] = useState<T | null>(initialState);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); 

    const callAPI = async (fn: () => Promise<T>) => {
        setIsLoading(true);
        setError(null);
        setData(null);
    
        try {
          const result = await fn();
          console.log(result)
          setData(result);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unexpected error occurred');
          }
        } finally {
          setIsLoading(false);
        }
      };
    
      return [{ data, isLoading, error }, callAPI];

}
