import { useRouter, usePathname } from "next/navigation";
import { useTransition, useRef } from "react";
export default function useSearch() {
  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const { replace } = useRouter();
  const pathname = usePathname();

  const startSearch = (keyword: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // timeoutRef.current = setTimeout(() => {
    let params = new URLSearchParams(window.location.search);
    if (keyword) {
      params.set("searchKeyword", keyword);
    } else {
      params.delete("searchKeyword");
    }
    startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
    });
  };
  return { isPending, startSearch };
}
