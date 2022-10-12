import React, {useRef} from "react";

const useInfiniteScrollView = () => {
    const [inView,setInView] = React.useState(false)
    const ref = useRef()

    React.useEffect(() => {
      const el = ref.current;
      const observer = new IntersectionObserver(entries => {
        console.log('entries',entries);
        setInView(entries[0]?.isIntersecting)
      })
      console.log(el);
      if (el) {
        observer.observe(el)
      }
      return () => {
        if (el) observer.unobserve(el)
      }
    },[])
    console.log(inView,9,ref.current);
    return { inView , ref }
}

export default useInfiniteScrollView;