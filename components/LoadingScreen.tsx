import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      <div className="relative w-full max-w-lg">
        {/* Animated blobs for fluid effect */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative flex flex-col items-center justify-center z-10 p-8">
          <h2 className="text-3xl font-bold text-white tracking-widest uppercase mb-4 animate-pulse">
            Creating
          </h2>
          <p className="text-gray-400 text-sm font-light">
            Gemini is dreaming up your wallpaper...
          </p>
          
          <div className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-[loading_2s_ease-in-out_infinite] w-1/2 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-150%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;