
import React, { useState, useCallback } from 'react';
import { CATEGORIES, COLOR_PALETTES } from './constants';
import { Category, ColorPair, AppView } from './types';
import { generateWallpaper } from './services/geminiService';
import LoadingScreen from './components/LoadingScreen';
import ResultView from './components/ResultView';
import { SwatchIcon, SparklesIcon } from '@heroicons/react/24/solid';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0]);
  const [selectedColor, setSelectedColor] = useState<ColorPair | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (isRegeneration = false) => {
    if (!selectedCategory || !selectedColor) return;

    setView('generating');
    setError(null);

    try {
      const base64Image = await generateWallpaper(
        selectedCategory.promptBase,
        selectedColor.color1,
        selectedColor.color2,
        isRegeneration
      );
      setGeneratedImage(base64Image);
      setView('result');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create wallpaper. Please try again.");
      setView('home');
    }
  }, [selectedCategory, selectedColor]);

  const onGenerateClick = () => handleGenerate(false);
  const onRegenerateClick = () => handleGenerate(true);

  const handleReset = () => {
    setView('home');
    setGeneratedImage(null);
  };

  if (view === 'generating') {
    return <LoadingScreen />;
  }

  if (view === 'result' && generatedImage) {
    return (
      <ResultView 
        imageSrc={generatedImage} 
        onBack={handleReset} 
        onRegenerate={onRegenerateClick} 
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-black text-white overflow-hidden relative font-sans">
      
      {/* Header */}
      <header className="p-6 pt-10">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          HeyWalls
        </h1>
        <p className="text-gray-400 text-sm mt-1">AI Wallpaper Generator</p>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-40 px-6">
        
        {/* Category Section */}
        <section className="mb-8">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2 text-gray-200">
            <SparklesIcon className="w-5 h-5 text-cyan-400" />
            Select Style
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 border-2 text-left group
                  ${selectedCategory.id === cat.id 
                    ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' 
                    : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
              >
                {/* Background Image */}
                <img 
                  src={cat.previewImage} 
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                
                {/* Selection Overlay */}
                <div className={`absolute inset-0 bg-cyan-500/20 transition-opacity duration-300 ${selectedCategory.id === cat.id ? 'opacity-100' : 'opacity-0'}`}></div>
                
                <div className="absolute bottom-0 left-0 p-3 w-full z-10">
                  <span className="block text-sm font-bold text-white shadow-black drop-shadow-md">
                    {cat.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-400 font-light h-4 transition-all">
            {selectedCategory?.description}
          </p>
        </section>

        {/* Color Palette Section */}
        <section className="mb-6 animate-[fadeInUp_0.5s_ease-out]">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2 text-gray-200">
            <SwatchIcon className="w-5 h-5 text-purple-400" />
            Pick Colors
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {COLOR_PALETTES.map((palette) => (
              <button
                key={palette.id}
                onClick={() => setSelectedColor(palette)}
                className={`flex items-center justify-between p-3 rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all
                  ${selectedColor?.id === palette.id 
                    ? 'border-purple-500 bg-gray-800 ring-1 ring-purple-500/50' 
                    : 'hover:bg-gray-800'
                  }`}
              >
                <span className="text-sm font-medium text-gray-300 ml-2">{palette.name}</span>
                <div className="flex gap-2 items-center mr-2">
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-600 shadow-sm" 
                    style={{ backgroundColor: palette.color1 }} 
                  />
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-600 shadow-sm -ml-4 z-10" 
                    style={{ backgroundColor: palette.color2 }} 
                  />
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Area */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
        {error && (
          <div className="mb-4 text-center text-red-400 text-xs bg-red-900/20 py-2 rounded-lg px-2 border border-red-900/50">
            {error}
          </div>
        )}
        <button
          onClick={onGenerateClick}
          disabled={!selectedCategory || !selectedColor}
          className={`w-full py-4 rounded-2xl font-bold text-lg tracking-wide shadow-xl transition-all duration-300
            ${selectedCategory && selectedColor 
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-cyan-500/25 transform hover:-translate-y-1' 
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
        >
          GENERATE WALLPAPER
        </button>
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;