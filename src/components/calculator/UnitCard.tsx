import React from 'react';
import { motion } from 'framer-motion';
import { Copy, LucideIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
interface OutputField {
  label: string;
  value: string;
  unit: string;
}
interface UnitCardProps {
  title: string;
  icon: LucideIcon;
  inputValue: string;
  inputUnit: string;
  units: { label: string; value: string }[];
  outputs: OutputField[];
  onValueChange: (val: string) => void;
  onUnitChange: (unit: string) => void;
}
export function UnitCard({
  title,
  icon: Icon,
  inputValue,
  inputUnit,
  units,
  outputs,
  onValueChange,
  onUnitChange,
}: UnitCardProps) {
  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full border-border/50 shadow-soft hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 rounded-lg bg-primary/5">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Enter value..."
                value={inputValue}
                onChange={(e) => onValueChange(e.target.value)}
                className="flex-1 bg-secondary/30"
              />
              <Select value={inputUnit} onValueChange={onUnitChange}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((u) => (
                    <SelectItem key={u.value} value={u.value}>
                      {u.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4 pt-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">
              Converted Results
            </Label>
            <div className="grid gap-3">
              {outputs.map((out) => (
                <div key={out.label} className="group relative">
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <span className="text-sm font-medium text-muted-foreground">
                      {out.label}
                    </span>
                    <span className="text-xs text-muted-foreground/60">{out.unit}</span>
                  </div>
                  <div className="relative">
                    <Input
                      readOnly
                      value={out.value || '—'}
                      className="pr-10 bg-muted/40 border-dashed border-muted-foreground/20 font-mono"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(out.value, out.label)}
                      disabled={!out.value}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}