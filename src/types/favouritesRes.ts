import { StrapiResponse } from "./strapiRes";

export interface FavouritesAttributes {
  title: string;
  emptyFavText: string;
}

export type FavouritesResponse = StrapiResponse<FavouritesAttributes>;
