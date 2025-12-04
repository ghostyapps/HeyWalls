
export interface Category {
  id: string;
  name: string;
  description: string;
  previewImage: string; // URL for the card background image
  promptBase: string;
}

export interface ColorPair {
  id: string;
  color1: string; // Hex
  color2: string; // Hex
  name: string;
}

export type AppView = 'home' | 'generating' | 'result';
