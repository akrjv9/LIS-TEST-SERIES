import React from 'react';
import { BookOpen } from 'lucide-react';

const Loader: React.FC<{ message?: string }> = ({ message = "Curating Questions..." }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className="w-16 h-16 bg-lib-100 rounded-full flex items-center justify-center animate-pulse">
          <BookOpen className="text-lib-600 animate-bounce" size={32} />
        </div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-lib-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h3 className="mt-8 text-xl font-bold text-slate-800">{message}</h3>
      <p className="mt-2 text-slate-500 text-sm max-w-md text-center">
        Our AI is consulting the digital archives to prepare your test on Library Science.
      </p>
    </div>
  );
};

export default Loader;