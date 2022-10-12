import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useCustomQuery = (onSuccess,onError) => {
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
        ["super-heroes"],
        () => {
          return axios.get("http://localhost:4000/superheroes");
        },
        {
          onSuccess,
          onError,
          select:  (data) => {
            const addAge = data?.data.map((hero) => hero)
            return addAge
          }
        }
      );
      return {
        data, isLoading, isError, error, isFetching, refetch
      }
}

export default useCustomQuery;