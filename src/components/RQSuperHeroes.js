import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function RQSuperHeroes() {
  const { data, isLoading, isError, error, isFetching } = useQuery(["super-heroes"], () => {
    return axios.get("http://localhost:4000/superheroes");
  },{
    refetchOnMount:false
  });
  console.log({isLoading,isFetching});
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <>
      <div>RQSuperHeroes</div>
      {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
}
