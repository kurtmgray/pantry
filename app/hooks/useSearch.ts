
import { useGlobalState } from "../providers";
import { useState, useRef } from "react";

// originally written for useTransition and deduping router.replace() calls
// subbing timeout/isLoading for useTransition

export default function useSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const {setState} = useGlobalState();

  const startSearch = (keyword: string, network?: boolean) => {
    if (network){
      console.log('network search')
      //handle network search
    } else if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }   
    setIsLoading(true);
    const timeout = setTimeout(() => {  
      setState((state: GlobalState) => ({...state, searchKeyword: keyword}));
      setIsLoading(false);
    }, 1000);
    timeoutRef.current = timeout;
  };
  return  { startSearch, isLoading };
}
