import React from "react";
import useInfiniteScrollView from "./useInfiniteScrollView";

const useLazyLoading = () => {
    const {ref,inView} = useInfiniteScrollView();

    React.useEffect(() => {
       const img = ref.current;
       if (inView) {
        img.setAttribute("src",img.alt)
        img.classList.add("active")
       }
    },[])
    return {ref}
}

export default useLazyLoading;