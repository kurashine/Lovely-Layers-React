import { useLocalStorage } from "usehooks-ts";
import { TFavourites } from "../../types/favourites";

export const useFavourites = () => {
  const [ids, setIds] = useLocalStorage<TFavourites>("favourites", []);

  const checkIsFav = (productId: string | number) => {
    return ids.includes(productId as string);
  };

  const handleFav = (productId: string | number) => {
    if (!productId) {
      return;
    }

    const sid = String(productId);

    const favs = checkIsFav(sid)
      ? ids.filter((id) => id !== sid)
      : [...ids, sid as string];

    setIds(favs);
  };

  return { favProductsIds: ids, checkIsFav, handleFav };
};
