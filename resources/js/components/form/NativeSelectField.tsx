import * as React from 'react';
import { FormField } from './FormField';
import { cn } from '@/lib/utils';

export interface NativeSelectOption {
  value: string;
  label: string;
}

interface NativeSelectFieldProps {
  label: string;
  name: string;
  options: NativeSelectOption[];
  defaultValue?: string;
  error?: string;
  optional?: boolean;
  placeholder?: string | null;
}

export function NativeSelectField({
  label,
  name,
  options,
  defaultValue,
  error,
  optional,
  placeholder,
}: NativeSelectFieldProps) {
  return (
    <FormField label={label} htmlFor={name} error={error} optional={optional}>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ''}
        aria-invalid={!!error}
        className={cn(
          'border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
          'dark:bg-input/30'
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
