import React from 'react';
import { StudyGuide } from '../../types';
import { BookOpen, ExternalLink, ArrowLeft } from 'lucide-react';

interface StudyViewProps {
  guide: StudyGuide;
  onBack: () => void;
}

const StudyView: React.FC<StudyViewProps> = ({ guide, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-600 hover:text-lib-600 mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Topics
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden p-8 md:p-12 print:border-none print:shadow-none">
        <div className="border-b border-slate-100 pb-6 mb-8">
          <div className="flex items-center gap-3 text-lib-600 mb-2">
            <BookOpen size={24} />
            <span className="font-semibold uppercase tracking-wider text-sm">Study Guide</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{guide.topic}</h1>
        </div>

        <div className="prose prose-slate max-w-none mb-12 text-slate-800">
           {/* Render markdown-style content with preservation of whitespace */}
           <div className="whitespace-pre-wrap leading-relaxed font-sans">
             {guide.content}
           </div>
        </div>

        {guide.sources.length > 0 && (
          <div className="bg-lib-50 rounded-xl p-6 border border-lib-100 print:hidden">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ExternalLink size={18} />
              Sources & References
            </h3>
            <ul className="space-y-3">
              {guide.sources.map((source, idx) => (
                <li key={idx}>
                  <a 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lib-700 hover:underline hover:text-lib-900 text-sm flex items-start gap-2 break-all"
                  >
                    <span className="mt-1">•</span>
                    <span>{source.title || source.uri}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyView;