
import { Category, ColorPair } from './types';

// NOTE: To use your own local reference images:
// 1. Save your image files to your project (e.g., in a 'public' or 'assets' folder).
// 2. Update the 'previewImage' property below. 
//    Example: previewImage: '/assets/my-liquid-gem.jpg'

export const CATEGORIES: Category[] = [
  {
    id: 'liquid-gems',
    name: 'Liquid Gems',
    description: 'Glossy, fluid glass textures resembling melted precious stones.',
    // Updated to a clearer, glass-like 3D abstract image
    previewImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80', 
    promptBase: 'Abstract 3D clear glass fluid sculpture, twisting transparent liquid loops, raytraced reflections, chromatic aberration, deep depth of field, dark cinematic background, hyper-realistic, 8k, vertical mobile wallpaper.'
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    description: 'Futuristic glowing lines and dark geometric shapes.',
    previewImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    promptBase: 'Cyberpunk abstract geometry, neon glowing light lines, dark background, futuristic techno texture, vertical mobile wallpaper, high contrast.'
  },
  {
    id: 'silk-waves',
    name: 'Silk Waves',
    description: 'Soft, elegant flowing fabric textures.',
    previewImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80',
    promptBase: 'Elegant silk fabric waves, soft studio lighting, smooth flowing abstract, minimal, vertical mobile wallpaper, high detail.'
  },
  {
    id: 'glass-morphism',
    name: 'Frosted Glass',
    description: 'Blurred transparencies and soft gradients.',
    previewImage: 'https://images.unsplash.com/photo-1496247749665-49cf5bf8756c?w=600&auto=format&fit=crop&q=80',
    promptBase: 'Glassmorphism abstract, frosted glass layers, soft blur, transparency, bokeh, vertical mobile wallpaper, clean modern design.'
  },
  {
    id: 'nature-scape',
    name: 'Nature',
    description: 'Organic landscapes, misty forests, and botanical details.',
    previewImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
    promptBase: 'Realistic nature landscape, forest mountains, botanical textures, organic forms, natural daylight, photorealistic, cinematic, vertical mobile wallpaper, high detail 8k.'
  },
  {
    id: 'minimal-zen',
    name: 'Minimalist',
    description: 'Clean geometry, negative space, and simple forms.',
    previewImage: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600&auto=format&fit=crop&q=80',
    promptBase: 'Minimalist abstract design, clean geometric lines, large negative space, simple forms, soft ambient occlusion, zen aesthetic, vertical mobile wallpaper, modern art.'
  }
];

export const COLOR_PALETTES: ColorPair[] = [
  { id: 'ocean', name: 'Deep Ocean', color1: '#0f172a', color2: '#0ea5e9' },
  { id: 'sunset', name: 'Sunset Glow', color1: '#4c0519', color2: '#f59e0b' },
  { id: 'royal', name: 'Royal Amethyst', color1: '#2e1065', color2: '#d8b4fe' },
  { id: 'nature', name: 'Forest Mist', color1: '#064e3b', color2: '#34d399' },
  { id: 'monochrome', name: 'Carbon Silver', color1: '#000000', color2: '#94a3b8' },
  { id: 'candy', name: 'Cotton Candy', color1: '#db2777', color2: '#67e8f9' },
];
