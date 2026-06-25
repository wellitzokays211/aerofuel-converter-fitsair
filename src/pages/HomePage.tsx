import React, { useState, useMemo } from 'react';
import { Fuel, DollarSign, Info } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UnitCard } from '@/components/calculator/UnitCard';
import { convertVolume, convertPrice, FuelUnit } from '@/lib/fuelMath';
export function HomePage() {
  // Volume Calculator State
  const [volumeValue, setVolumeValue] = useState<string>('');
  const [volumeUnit, setVolumeUnit] = useState<FuelUnit>('L');
  // Price Calculator State
  const [priceValue, setPriceValue] = useState<string>('');
  const [priceUnit, setPriceUnit] = useState<FuelUnit>('L');
  // Derived Calculations
  const volumeResults = useMemo(() => convertVolume(volumeValue, volumeUnit), [volumeValue, volumeUnit]);
  const priceResults = useMemo(() => convertPrice(priceValue, priceUnit), [priceValue, priceUnit]);
  const volumeUnits = [
    { label: 'Litres', value: 'L' },
    { label: 'Kilograms', value: 'KG' },
    { label: 'US Gallons', value: 'USG' },
  ];
  const priceUnits = [
    { label: 'per Litre', value: 'L' },
    { label: 'per KG', value: 'KG' },
    { label: 'per USG', value: 'USG' },
  ];
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-primary/5 blur-3xl -z-10 rounded-full" />
      <ThemeToggle />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-16 lg:py-20">
          {/* Header Section */}
          <header className="max-w-3xl mx-auto text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-2">
              <Fuel className="w-3.5 h-3.5" />
              Aviation Tools
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-foreground">
              Aero Fuel <span className="text-primary">Converter</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Jet fuel volume and price converter - FitsAir Strategy
            </p>
          </header>
          {/* Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <UnitCard
              title="Volume & Mass"
              icon={Fuel}
              inputValue={volumeValue}
              inputUnit={volumeUnit}
              units={volumeUnits}
              onValueChange={setVolumeValue}
              onUnitChange={(u) => setVolumeUnit(u as FuelUnit)}
              outputs={[
                { label: 'Total Litres', value: volumeResults.L, unit: 'L' },
                { label: 'Total Weight', value: volumeResults.KG, unit: 'KG' },
                { label: 'Total US Gallons', value: volumeResults.USG, unit: 'USG' },
              ]}
            />
            <UnitCard
              title="Price Comparisons"
              icon={DollarSign}
              inputValue={priceValue}
              inputUnit={priceUnit}
              units={priceUnits}
              onValueChange={setPriceValue}
              onUnitChange={(u) => setPriceUnit(u as FuelUnit)}
              outputs={[
                { label: 'Price per Litre', value: priceResults.perL, unit: '$/L' },
                { label: 'Price per Kilogram', value: priceResults.perKG, unit: '$/KG' },
                { label: 'Price per US Gallon', value: priceResults.perUSG, unit: '$/USG' },
              ]}
            />
          </div>
          {/* Footer Info */}
          <footer className="mt-16 pt-8 border-t border-border/40 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <Info className="w-4 h-4" />
              <p>Calculations based on standard Jet A-1 density (0.8 kg/L).</p>
            </div>
            <p className="text-xs text-muted-foreground/60">
              Note: Actual fuel density varies with temperature. This tool is for estimation purposes only.
            </p>
          </footer>
        </div>
      </div>
      <Toaster position="bottom-center" richColors />
    </div>
  );
}
