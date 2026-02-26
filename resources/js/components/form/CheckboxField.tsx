import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

export function CheckboxField({
  label,
  name,
  checked,
  onCheckedChange,
  error,
}: CheckboxFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={name}
          name={name}
          checked={checked}
          onCheckedChange={(c) => onCheckedChange(c === true)}
          aria-invalid={!!error}
        />
        <Label
          htmlFor={name}
          className="cursor-pointer text-sm font-normal text-muted-foreground"
        >
          {label}
        </Label>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
