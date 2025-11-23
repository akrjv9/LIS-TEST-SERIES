import React from 'react';
import { BookOpen, Github } from 'lucide-react';

interface HeaderProps {
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-lib-200 bg-white/80 backdrop-blur-md shadow-sm print:static print:shadow-none print:border-none">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onHomeClick}
        >
          <div className="bg-lib-600 p-2 rounded-lg text-white">
            <BookOpen size={24} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            LibSci<span className="text-lib-600">Master</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 print:hidden">
          <button 
            onClick={onHomeClick}
            className="text-slate-600 hover:text-lib-600 font-medium transition-colors"
          >
            Home
          </button>
          <span className="text-slate-400">|</span>
          <span className="text-sm text-slate-500 italic">
            Powered by Gemini 2.5 Flash
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;