import useSWR from "swr";
import { CategoryResponse } from "../../types/categoryRes";
import qs from "qs";

export function useCategoryDataBySlug(slug: string) {
  const params = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const { data, error, isLoading } = useSWR<CategoryResponse>(
    `/api/categories?${params}`
  );

  return {
    data: data?.data?.length ? data.data[0] : null,
    isLoading,
    error,
  };
}
