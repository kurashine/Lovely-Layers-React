import useSWR from "swr";
import qs from "qs";
import { CategorySidebarResponse } from "../../types/categorySidebarRes";

export function useCategorySidebarData() {
  const params = qs.stringify(
    {
      populate: [
        "sidebar.brands",
        "sidebar.brands.brands",
        "sidebar.amounts",
        "sidebar.amounts.currency",
        "sidebar.sizes",
        "sidebar.sizes.sizes",
      ],
    },
    { encodeValuesOnly: true }
  );

  const { data, error, isLoading } = useSWR<CategorySidebarResponse>(
    `/api/category-sidebar?${params}`
  );

  return {
    data,
    isLoading,
    error,
  };
}
