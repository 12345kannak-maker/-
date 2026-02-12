
import React, { useState, useEffect, useRef } from 'react';

interface DamVisualizerProps {
  percentage: number;
  m3Value: number;
}

const DamVisualizer: React.FC<DamVisualizerProps> = ({ percentage, m3Value }) => {
  const [isRaining, setIsRaining] = useState(false);
  const prevValueRef = useRef(m3Value);
  const isFull = percentage >= 100;
  
  // تفعيل تأثير المطر عند زيادة القيمة
  useEffect(() => {
    if (m3Value > prevValueRef.current) {
      setIsRaining(true);
      const timer = setTimeout(() => setIsRaining(false), 3000);
      return () => clearTimeout(timer);
    }
    prevValueRef.current = m3Value;
  }, [m3Value]);

  // منسوب المياه الفعلي (0-200)
  const waterHeight = (percentage / 100) * 200;
  
  return (
    <div className={`relative w-full max-w-2xl mx-auto h-[450px] bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border-8 transition-colors duration-500 ${isFull ? 'border-red-600 shadow-red-200' : 'border-slate-800'}`}>
      
      {/* Flood Alert Top Bar */}
      {isFull && (
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white py-2 px-4 flex items-center justify-between z-30 animate-pulse">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-black uppercase tracking-widest">تحذير: السد ممتلئ! خطر فيضان</span>
          </div>
          <span className="text-[10px] font-bold">MAX CAPACITY REACHED</span>
        </div>
      )}

      {/* Sky Background with Dynamic Atmosphere */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${isFull ? 'bg-slate-800' : isRaining ? 'bg-slate-700' : 'bg-gradient-to-b from-sky-300 to-sky-100'}`}></div>
      
      {/* Dynamic Clouds */}
      <div className={`absolute top-12 left-1/2 -translate-x-1/2 transition-all duration-1000 ${isRaining || isFull ? 'scale-110 opacity-100' : 'scale-90 opacity-60'}`}>
        <svg width="200" height="80" viewBox="0 0 200 80">
          <path d="M40,60 Q20,60 20,40 Q20,20 40,20 Q45,20 50,25 Q60,10 80,10 Q100,10 110,25 Q115,20 125,20 Q145,20 145,40 Q145,60 125,60 Z" fill={isFull ? "#1e293b" : isRaining ? "#475569" : "white"} />
          <path d="M100,70 Q80,70 80,50 Q80,30 100,30 Q105,30 110,35 Q120,20 140,20 Q160,20 170,35 Q175,30 185,30 Q205,30 205,50 Q205,70 185,70 Z" fill={isFull ? "#0f172a" : isRaining ? "#334155" : "white"} opacity="0.8" transform="translate(-20, 0)" />
        </svg>
      </div>

      {/* Rain Effect Container */}
      {(isRaining || isFull) && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(isFull ? 40 : 20)].map((_, i) => (
            <div 
              key={i}
              className={`absolute w-[2px] h-8 rounded-full animate-fall ${isFull ? 'bg-slate-400/40' : 'bg-blue-400/60'}`}
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `-50px`,
                animationDuration: `${0.3 + Math.random() * 0.5}s`,
                animationDelay: `${Math.random() * 2}s`,
                animationIterationCount: 'infinite'
              }}
            />
          ))}
        </div>
      )}

      {/* SVG Container for the Dam */}
      <svg viewBox="0 0 400 250" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {/* The Water Body */}
        <path 
          d={`M 20,250 L 380,250 L ${380 - (Math.min(percentage, 100)/100 * 60)},${250 - waterHeight} L ${20 + (Math.min(percentage, 100)/100 * 60)},${250 - waterHeight} Z`}
          fill={isFull ? "url(#waterFullGradient)" : "url(#waterGradient)"}
          className="transition-all duration-1000 ease-in-out"
        />

        {/* Water Surface Glow */}
        <line 
          x1={20 + (Math.min(percentage, 100)/100 * 60)} 
          y1={250 - waterHeight} 
          x2={380 - (Math.min(percentage, 100)/100 * 60)} 
          y2={250 - waterHeight} 
          stroke={isFull ? "#f87171" : "#93c5fd"} 
          strokeWidth="3"
          className="transition-all duration-1000 ease-in-out"
        />

        {/* Dam Walls */}
        <path d="M 320,50 L 380,250 L 400,250 L 400,50 Z" fill="#1e293b" />
        <path d="M 80,50 L 20,250 L 0,250 L 0,50 Z" fill="#1e293b" />
        <rect x="0" y="245" width="400" height="5" fill="#0f172a" />

        {/* Red Alarm Light on Wall */}
        {isFull && (
          <circle cx="350" cy="100" r="4" fill="red" className="animate-ping" />
        )}

        {/* Graduation Marks */}
        {[0, 25, 50, 75, 100].map((mark) => {
          const y = 250 - (mark / 100) * 200;
          return (
            <g key={mark} className="opacity-40">
              <line x1="80" y1={y} x2="90" y2={y} stroke="white" strokeWidth="0.5" />
              <text x="95" y={y + 3} fontSize="6" fill="white" style={{ fontFamily: 'monospace' }}>
                {mark}%
              </text>
            </g>
          );
        })}

        {/* Gradients */}
        <defs>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="waterFullGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating UI Elements */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-20">
        <div className={`backdrop-blur-md p-4 rounded-2xl border shadow-2xl transition-all duration-500 ${isFull ? 'bg-red-950/90 border-red-500' : 'bg-slate-900/80 border-slate-700'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isFull ? 'bg-red-500 animate-ping' : isRaining ? 'bg-blue-400 animate-pulse' : 'bg-slate-600'}`}></div>
            <span className={`text-xs font-bold uppercase tracking-widest ${isFull ? 'text-red-400' : 'text-slate-300'}`}>
              {isFull ? 'تنبيه طارئ' : 'مراقب التدفق'}
            </span>
          </div>
          <div className={`text-2xl font-black mt-1 ${isFull ? 'text-red-100' : 'text-white'}`}>
            {new Intl.NumberFormat('en-US').format(m3Value.toFixed(2))} <span className={`${isFull ? 'text-red-400' : 'text-blue-400'} text-sm`}>m³</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
           {(isRaining || isFull) && (
             <div className={`${isFull ? 'bg-red-600' : 'bg-blue-600'} text-white text-[10px] font-bold px-2 py-1 rounded-md animate-bounce`}>
               {isFull ? 'تحذير فيضان!' : 'جاري الملء...'}
             </div>
           )}
           <div className={`h-32 w-2 bg-slate-800 rounded-full overflow-hidden flex flex-col justify-end border ${isFull ? 'border-red-500' : 'border-transparent'}`}>
             <div 
               className={`w-full transition-all duration-1000 ${isFull ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`} 
               style={{ height: `${Math.min(percentage, 100)}%` }}
             ></div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          to { transform: translateY(500px); }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
};

export default DamVisualizer;
