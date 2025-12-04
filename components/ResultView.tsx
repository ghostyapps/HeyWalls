import React from 'react';
import { ArrowLeftIcon, ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface ResultViewProps {
  imageSrc: string;
  onBack: () => void;
  onRegenerate: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ imageSrc, onBack, onRegenerate }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `lumina-wallpaper-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative h-full w-full bg-black flex flex-col animate-[fadeIn_0.5s_ease-out]">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 z-20 p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/10 transition-colors"
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </button>

      {/* Image Display */}
      <div className="flex-1 w-full h-full relative">
        <img 
          src={imageSrc} 
          alt="Generated Wallpaper" 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay gradient for button visibility */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
      </div>

      {/* Action Buttons (Floating Bottom Right) */}
      <div className="absolute bottom-8 right-8 z-30 flex gap-4">
        {/* Regenerate Button */}
        <button
          onClick={onRegenerate}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 shadow-lg hover:bg-black/70 active:scale-95 transition-all duration-300 group"
          title="Regenerate"
        >
          <ArrowPathIcon className="h-7 w-7 text-white group-hover:rotate-180 transition-transform duration-700" />
        </button>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-black shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all duration-300 group"
          title="Download"
        >
          <ArrowDownTrayIcon className="h-7 w-7 text-black group-hover:text-cyan-600 transition-colors" />
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ResultView;