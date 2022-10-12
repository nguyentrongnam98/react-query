import React from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
export default function Query() {
  const [count,setCount] = React.useState(0)
  const getDataSuperHero = async (...params) => {
    const [_page, _limit] = params;
    try {
      return await (
        await axios.get(
          `http://localhost:3000/superheroes?_page=${_page}&_limit=${_limit}`
        )
      ).data;
    } catch (error) {
      console.log("error", error);
      throw new Error(error);
    }
  };
  const getDataStudent = async (...params) => {
    const [_page, _limit] = params;
    try {
      return await (
        await axios.get(`http://localhost:3000/student`)
      ).data;
    } catch (error) {
      console.log("error", error);
      throw new Error(error);
    }
  };
  const _page = 1;
  const _limit = 3;
  const { data, isError, error, isLoading } = useQuery(
    ["todos", _page, _limit],
    () => getDataSuperHero(_page, _limit),
    { retry: false, enabled: !!_page }
  );
  // const results = useQueries({queries:[
  //   {
  //     queryKey: ['superheroes',_page , _limit],
  //     queryFn: () => getDataSuperHero(_page , _limit),
  //     retry:false
  //   },
  //   {
  //     queryKey: ['student'],
  //     queryFn: () => getDataStudent(),
  //     retry:false
  //   }
  // ]})
  // console.log("data", results);
  // const isLoading = results.some(result => result.isLoading)
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error?.message}</h1>;
  }
  return (
    <div>
      <h3>List Data</h3>
      <ul>
        {data.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
      <button onClick={() => setCount(count + 1)}>{`Click - ${count}`}</button>
    </div>
  );
}
