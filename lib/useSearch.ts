// import { useRouter, usePathname } from "next/navigation";
import { useTransition, useRef } from "react";
import { useGlobalState } from "@/app/providers";

export default function useSearch() {
  // const [isPending, startTransition] = useTransition();
  // const timeoutRef = useRef<NodeJS.Timeout>();
  // const router = useRouter();
  // const pathname = usePathname();
const {setState} = useGlobalState();

  const startSearch = (keyword: string) => {
    // if (timeoutRef.current) {
    //   clearTimeout(timeoutRef.current);
    // }
    // timeoutRef.current = setTimeout(() => {
    // let params = new URLSearchParams(window.location.search);
    // if (keyword) {
    //   params.set("searchKeyword", keyword);
    // } else {
    //   params.delete("searchKeyword");
    // }
    // startTransition(() => {
    //     window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
        

    // });
    setState((state: GlobalState) => ({...state, searchKeyword: keyword}));
    // }, 500
    // );
  };
  return  {startSearch };
}
