/**
 * Jet Fuel Conversion Constants
 * Density: 1 Litre = 0.8 KG (Standard Jet A-1)
 * Volume: 1 US Gallon = 3.78541 Litres
 * Derived: 1 Litre = 0.264172 USG
 */
export const KG_PER_L = 0.8;
export const USG_PER_L = 0.264172;
export type FuelUnit = 'L' | 'KG' | 'USG';
export interface VolumeOutputs {
  L: string;
  KG: string;
  USG: string;
}
export interface PriceOutputs {
  perL: string;
  perKG: string;
  perUSG: string;
}
const format = (val: number): string => (isNaN(val) ? '0.0000' : val.toFixed(4));
export function convertVolume(value: string | number, fromUnit: FuelUnit): VolumeOutputs {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue) || numValue === 0) {
    return { L: '', KG: '', USG: '' };
  }
  // Normalize to Litres
  let litres = 0;
  if (fromUnit === 'L') litres = numValue;
  else if (fromUnit === 'KG') litres = numValue / KG_PER_L;
  else if (fromUnit === 'USG') litres = numValue / USG_PER_L;
  return {
    L: format(litres),
    KG: format(litres * KG_PER_L),
    USG: format(litres * USG_PER_L),
  };
}
export function convertPrice(value: string | number, fromUnit: FuelUnit): PriceOutputs {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue) || numValue === 0) {
    return { perL: '', perKG: '', perUSG: '' };
  }
  // Normalize to Price per Litre
  // Note: If Price per KG is $1, then Price per L is $0.80 (since 1L weighs less than 1KG)
  let pricePerL = 0;
  if (fromUnit === 'L') pricePerL = numValue;
  else if (fromUnit === 'KG') pricePerL = numValue * KG_PER_L;
  else if (fromUnit === 'USG') pricePerL = numValue * USG_PER_L;
  return {
    perL: format(pricePerL),
    perKG: format(pricePerL / KG_PER_L),
    perUSG: format(pricePerL / USG_PER_L),
  };
}