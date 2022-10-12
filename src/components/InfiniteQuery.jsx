import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useInfiniteScrollView from "./useInfiniteScrollView";
import axios from "axios";
export default function InfiniteQuery() {
    const [_limit,setLimit] = React.useState(2)
    const { inView, ref } = useInfiniteScrollView()
  const getDataSuperHero = async ({pageParam = 1}) => {
    try {
        return await (
            await axios.get(
              `http://localhost:3000/superheroes?_page=${pageParam}&_limit=${_limit}`
            )
          ).data
    } catch (error) {
        throw new Error(error)
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["superheroes"], getDataSuperHero, {
    getNextPageParam: (lastPage, pages) => {
        if (lastPage.length >= _limit) {
           return pages.length + 1
        } else {
            return undefined
        }
    },
  });

  React.useEffect(() => {
    if (inView && !isFetchingNextPage) {
      console.log('clgt',isFetchingNextPage);
      fetchNextPage()
    }
  },[inView, isFetchingNextPage, fetchNextPage])
  return (
    <>
       {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.map(project => (
            <p key={project.id} style={{marginBottom:500}}>{project.name}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          ref={ref}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}
