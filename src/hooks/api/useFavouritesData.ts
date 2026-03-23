import useSWR from "swr";
import { FavouritesResponse } from "../../types/favouritesRes";

export const useFavouritesData = () => {
  const { data, error, isLoading } =
    useSWR<FavouritesResponse>("/api/favourite");

  return {
    data: data?.data ? data?.data : null,
    isLoading,
    error,
  };
};
