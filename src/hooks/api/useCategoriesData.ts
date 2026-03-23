import useSWR from "swr";
import { CategoryResponse } from "../../types/categoryRes";

export function useCategoriesData() {
  const { data, error, isLoading } =
    useSWR<CategoryResponse>("/api/categories");

  return {
    data: data?.data ? data?.data : [],
    isLoading,
    error,
  };
}
