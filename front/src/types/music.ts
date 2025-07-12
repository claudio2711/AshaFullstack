export interface Album {
  id: string;
  title: string;
  desc: string;
  cover: string;
  bgColor: string;
  artist?: string;
}

export interface Song {
  id: number;
  albumId: string;
  title: string;
  cover: string;
  artist: string;
  src: string;
  duration?: string;
  date?: string;
  albumTitle?: string;
}
