
import React from 'react';
import { UnitType } from '../types';

interface ControlPanelProps {
  value: string;
  unit: UnitType;
  onValueChange: (val: string) => void;
  onUnitChange: (unit: UnitType) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ value, unit, onValueChange, onUnitChange }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
        لوحة التحكم بالكمية
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-600">أدخل القيمة:</label>
          <input
            type="number"
            min="0"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none transition-all text-lg font-semibold"
            placeholder="مثلاً: 1000"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-600">اختر الوحدة:</label>
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value as UnitType)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none transition-all text-lg font-semibold bg-slate-50 cursor-pointer"
          >
            <option value={UnitType.LITER}>لتر (L)</option>
            <option value={UnitType.MILLILITER}>مليلتر (mL)</option>
            <option value={UnitType.CUBIC_METER}>متر مكعب (m³)</option>
          </select>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-700 text-sm leading-relaxed">
        <strong>💡 معلومة تعليمية:</strong>
        <p>هل تعلم أن المتر المكعب الواحد (1m³) يستوعب بالضبط 1000 لتر من الماء؟ هذا يعني أن خزاناً أبعاده 1م × 1م × 1م يتسع لألف قارورة لترية!</p>
      </div>
    </div>
  );
};

export default ControlPanel;
