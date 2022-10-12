import React from "react";
import useCustomQuery from "./customQuery";
import { Link } from 'react-router-dom';
export default function RQSuperHeroes() {
  const onSuccess = (data) => {
    console.log('success',data)
  }
  const onError = (error) => {
    console.log('error',error)
  }
  const { data, isLoading, isError, error, isFetching, refetch } = useCustomQuery(onSuccess,onError)

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <div>RQSuperHeroes</div>
      <button onClick={refetch}>Fetch data</button>
      {data?.map((hero) => {
        return <div key={hero.id}>
          <Link to={`/rq-super-hero/${hero.id}`}>{hero.name}</Link>
        </div>;
      })}
    </>
  );
}
