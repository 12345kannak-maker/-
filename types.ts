
export enum UnitType {
  LITER = 'L',
  MILLILITER = 'mL',
  CUBIC_METER = 'm3'
}

export interface VolumeData {
  value: number;
  unit: UnitType;
}

export interface ConversionResult {
  m3: number;
  L: number;
  mL: number;
  percentage: number;
}
