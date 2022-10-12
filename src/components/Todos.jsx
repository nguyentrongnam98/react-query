import React from 'react'
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
export default function Todos() {
    const [_page, setPage] = React.useState(0)

    const getDataSuperHero = async () => {
        try {
          return await (
            await axios.get(
              `http://localhost:3000/superheroes?_page=${_page}&_limit=2`
            )
          ).data;
        } catch (error) {
          console.log("error", error);
          throw new Error(error);
        }
      };
  
    const {
      isLoading,
      isError,
      error,
      data,
      isFetching,
      isPreviousData,
    } = useQuery(['superheroes', _page], () => getDataSuperHero(_page), { keepPreviousData : true })
    console.log('isLoading',isLoading);
    return (
      <div>
        {isLoading ? (
          <div>Loading...123</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {data.map(project => (
              <p key={project.id}>{project.name}</p>
            ))}
          </div>
        )}
        <span>Current Page: {_page + 1}</span>
        <button
          onClick={() => setPage(old => Math.max(old - 1, 0))}
          disabled={_page === 0}
        >
          Previous Page
        </button>{' '}
        <button
          onClick={() => {
            if (!isPreviousData) {
              setPage(old => old + 1)
            }
          }}
          // Disable the Next Page button until we know a next page is available
        //   disabled={isPreviousData || !data?.hasMore}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}{' '}
      </div>
    )
}
