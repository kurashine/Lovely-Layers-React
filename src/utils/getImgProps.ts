import { Media } from "../types/strapiRes";

export const getImgProps = (media: Media, alt: string = "Img") => ({
  alt: media.attributes.alternativeText || alt,
  src: `${process.env.REACT_APP_API_URL}/${media.attributes.url}`,
});
