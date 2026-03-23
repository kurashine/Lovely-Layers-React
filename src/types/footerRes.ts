import { Media, StrapiResponse } from "./strapiRes";

export interface SocialLink {
  id: number;
  href: string;
  alt: string;
  icon: {
    data: Media;
  };
}

export interface SupportBlock {
  id: number;
  title: string;
  link: string;
}

export interface FooterData {
  social_links_title: string;
  copyright: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  social_links: SocialLink[];
  support_block: SupportBlock;
}

export type FooterResponse = StrapiResponse<FooterData>;
