
import { UnitType, ConversionResult } from '../types';
import { MAX_DAM_CAPACITY_M3 } from '../constants';

export const convertToM3 = (value: number, unit: UnitType): number => {
  switch (unit) {
    case UnitType.LITER:
      return value / 1000;
    case UnitType.MILLILITER:
      return value / 1000000;
    case UnitType.CUBIC_METER:
      return value;
    default:
      return 0;
  }
};

export const getFullConversion = (m3Value: number): ConversionResult => {
  return {
    m3: m3Value,
    L: m3Value * 1000,
    mL: m3Value * 1000000,
    percentage: Math.min((m3Value / MAX_DAM_CAPACITY_M3) * 100, 100)
  };
};
