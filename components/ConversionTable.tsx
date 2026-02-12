
import React from 'react';

const ConversionTable: React.FC = () => {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-sm" dir="ltr">
      <table className="w-full text-center border-collapse text-[10px] md:text-sm font-sans">
        <thead>
          {/* Row 1: Main Units */}
          <tr className="bg-slate-800 text-white">
            <th colSpan={3} className="py-2 border-r border-slate-700">m³</th>
            <th colSpan={3} className="py-2 border-r border-slate-700 bg-blue-700">dm³ (L)</th>
            <th colSpan={3} className="py-2">cm³ (mL)</th>
          </tr>
          {/* Row 2: Sub-units/Capacity Units */}
          <tr className="bg-slate-100 text-slate-600">
            <th className="p-1 border border-slate-200">100</th>
            <th className="p-1 border border-slate-200">10</th>
            <th className="p-1 border border-slate-200">1</th>
            <th className="p-1 border border-slate-200 bg-blue-50 text-blue-700 font-bold">hL</th>
            <th className="p-1 border border-slate-200 bg-blue-50 text-blue-700 font-bold">daL</th>
            <th className="p-1 border border-slate-200 bg-blue-600 text-white font-bold">L</th>
            <th className="p-1 border border-slate-200">dL</th>
            <th className="p-1 border border-slate-200">cL</th>
            <th className="p-1 border border-slate-200 bg-indigo-600 text-white font-bold">mL</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="p-2 border border-slate-200"></td>
            <td className="p-2 border border-slate-200"></td>
            <td className="p-2 border border-slate-200 font-bold text-slate-800">1</td>
            <td className="p-2 border border-slate-200 text-blue-600">0</td>
            <td className="p-2 border border-slate-200 text-blue-600">0</td>
            <td className="p-2 border border-slate-200 text-blue-600 font-bold">0</td>
            <td className="p-2 border border-slate-200 text-slate-300">0</td>
            <td className="p-2 border border-slate-200 text-slate-300">0</td>
            <td className="p-2 border border-slate-200 text-slate-300">0</td>
          </tr>
        </tbody>
      </table>
      <div className="bg-slate-50 p-2 text-center text-[11px] text-slate-500 font-medium" dir="rtl">
        ملاحظة: المتر المكعب يحتوي على 1000 لتر. اللتر الواحد يساوي ديسي متر مكعب.
      </div>
    </div>
  );
};

export default ConversionTable;
