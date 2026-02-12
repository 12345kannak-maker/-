
import React from 'react';
import { ConversionResult } from '../types';

interface ResultDisplayProps {
  results: ConversionResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  const formatNumber = (num: number) => {
    // Using 'en-US' ensures Latin digits (1, 2, 3) with standard comma separators
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      <div className="bg-white p-5 rounded-2xl shadow-sm border-b-4 border-blue-500 flex flex-col items-center justify-center transition-transform hover:scale-105">
        <span className="text-slate-500 text-sm mb-1 uppercase font-bold tracking-wider">متر مكعب (m³)</span>
        <span className="text-2xl font-black text-slate-800">{formatNumber(results.m3)}</span>
      </div>
      
      <div className="bg-white p-5 rounded-2xl shadow-sm border-b-4 border-emerald-500 flex flex-col items-center justify-center transition-transform hover:scale-105">
        <span className="text-slate-500 text-sm mb-1 uppercase font-bold tracking-wider">لتر (L)</span>
        <span className="text-2xl font-black text-slate-800">{formatNumber(results.L)}</span>
      </div>
      
      <div className="bg-white p-5 rounded-2xl shadow-sm border-b-4 border-indigo-500 flex flex-col items-center justify-center transition-transform hover:scale-105 overflow-hidden">
        <span className="text-slate-500 text-sm mb-1 uppercase font-bold tracking-wider">مليلتر (mL)</span>
        <span className="text-xl font-black text-slate-800 truncate w-full text-center">
          {results.mL > 1000000 ? results.mL.toExponential(2) : formatNumber(results.mL)}
        </span>
      </div>
    </div>
  );
};

export default ResultDisplay;
