import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormField } from './FormField';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  optional?: boolean;
  placeholder?: string;
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  optional,
  placeholder = 'Select…',
}: SelectFieldProps) {
  return (
    <FormField label={label} htmlFor={name} error={error} optional={optional}>
      <Select value={value} onValueChange={onChange} name={name}>
        <SelectTrigger id={name} className="w-full" aria-invalid={!!error}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}
