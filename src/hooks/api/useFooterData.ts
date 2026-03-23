import useSWR from "swr";
import qs from "qs";
import { FooterResponse } from "../../types/footerRes";

export function useFooterData() {
  const params = qs.stringify(
    {
      populate: ["support_block", "social_links", "social_links.icon"],
    },
    { encodeValuesOnly: true }
  );

  const { data, error, isLoading } = useSWR<FooterResponse>(
    `/api/footer?${params}`
  );

  return {
    data,
    isLoading,
    error,
  };
}
