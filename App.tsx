
import React, { useState, useMemo } from 'react';
import { UnitType, ConversionResult } from './types';
import { convertToM3, getFullConversion } from './utils/conversions';
import { INITIAL_VOLUME, MAX_DAM_CAPACITY_M3 } from './constants';
import DamVisualizer from './components/DamVisualizer';
import ControlPanel from './components/ControlPanel';
import ResultDisplay from './components/ResultDisplay';
import ConversionTable from './components/ConversionTable';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>(INITIAL_VOLUME.toString());
  const [selectedUnit, setSelectedUnit] = useState<UnitType>(UnitType.CUBIC_METER);
  
  const results: ConversionResult = useMemo(() => {
    const numericValue = parseFloat(inputValue) || 0;
    const m3 = convertToM3(numericValue, selectedUnit);
    return getFullConversion(m3);
  }, [inputValue, selectedUnit]);

  if (showIntro) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800">مختبر السعة والحجم التفاعلي</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  الحجم (Volume)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  هو المكان الذي يشغله الجسم في الفراغ. تخيل صندوقاً فارغاً، المساحة بداخله هي الحجم. نستخدم وحدات مثل <span className="font-bold">m³ (متر مكعب)</span>.
                </p>
              </div>
              <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100">
                <h3 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  السعة (Capacity)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  هي كمية المادة (مثل الماء) التي يمكن أن نضعها داخل هذا الحجم. نستخدم وحدات السوائل مثل <span className="font-bold">L (لتر)</span>.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-slate-800 font-bold mb-4 px-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                </svg>
                جدول التحويلات المركب (من اليسار إلى اليمين):
              </h4>
              <ConversionTable />
              <p className="text-xs text-slate-500 italic text-center">
                تلاحظ أن كل خانة في الحجم (المكعب) تنقسم إلى 3 خانات فرعية لاستيعاب الآلاف.
              </p>
            </div>

            <button 
              onClick={() => setShowIntro(false)}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 group"
            >
              ابدأ تجربة ملء السد
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20 selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-6 px-4 mb-8 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25"></div>
              <div className="relative bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
            <button onClick={() => setShowIntro(true)} className="group text-right">
              <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none group-hover:text-blue-600 transition-colors">محاكي السد الذكي</h1>
              <p className="text-slate-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">إضغط هنا لمراجعة الشرح والجدول</p>
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase">القدرة الاستيعابية</span>
            <div className="px-5 py-2 bg-slate-900 text-white rounded-xl text-sm font-black shadow-lg shadow-slate-200">
               {MAX_DAM_CAPACITY_M3} m³
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <section className="relative group">
            <div className={`absolute -inset-4 rounded-[2rem] blur-2xl transition-all opacity-50 ${results.percentage >= 100 ? 'bg-red-500' : 'bg-blue-100 group-hover:opacity-70'}`}></div>
            <DamVisualizer percentage={results.percentage} m3Value={results.m3} />
          </section>
          
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h4 className="font-black text-slate-800 mb-4 text-lg">جدول التحويل السريع</h4>
            <ConversionTable />
          </section>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8">
          <ControlPanel 
            value={inputValue} 
            unit={selectedUnit} 
            onValueChange={setInputValue} 
            onUnitChange={setSelectedUnit} 
          />
          
          <div className="relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg z-10">
               النتائج المحولة
             </div>
             <ResultDisplay results={results} />
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl">
            <h5 className="font-bold mb-4 flex items-center gap-2 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              هل تعلم؟
            </h5>
            <p className="text-sm leading-relaxed text-slate-300">
              كلما ارتفع منسوب المياه في السد، نرى الحجم (m³) يزداد، وهذا يعني أننا نملأ آلاف السعات (Liters) في نفس الوقت.
              <br/><br/>
              <span className="text-white font-bold underline decoration-blue-500 underline-offset-4">
                1 m³ = 1000 L = 1,000,000 mL
              </span>
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-20 py-10 border-t border-slate-200 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Smart Educational Dam Simulator</p>
        <p className="text-slate-500 text-sm">تطبيق تعليمي تفاعلي يجمع بين الفيزياء والرياضيات</p>
      </footer>
    </div>
  );
};

export default App;
