export type SocialLink = {
  name: string;
  handle: string;
  link: string;
};

export type Creator = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  url: SocialLink[] | null;
};
