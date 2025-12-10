export interface GiphyImage {
  url: string;
  width: string;
  height: string;
}

export interface GiphyGif {
  id: string;
  title: string;
  images: {
    fixed_height: GiphyImage;
    downsized_medium?: GiphyImage;
  };
}

export interface GiphyCategory {
  name: string;
  name_encoded: string;
}