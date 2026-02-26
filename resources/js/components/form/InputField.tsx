import * as React from 'react';
import { Input } from '@/components/ui/input';
import { FormField } from './FormField';

type InputFieldBase = Omit<React.ComponentProps<typeof Input>, 'id'> & {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
};

type InputFieldControlled = InputFieldBase & {
  value: string;
  onChange: (value: string) => void;
  defaultValue?: never;
};

type InputFieldUncontrolled = InputFieldBase & {
  value?: never;
  onChange?: never;
  defaultValue?: string;
};

type InputFieldProps = InputFieldControlled | InputFieldUncontrolled;

export function InputField({
  label,
  name,
  value,
  onChange,
  defaultValue,
  error,
  optional,
  className,
  ...props
}: InputFieldProps) {
  const isControlled = value !== undefined;
  return (
    <FormField label={label} htmlFor={name} error={error} optional={optional}>
      <Input
        id={name}
        name={name}
        {...(isControlled
          ? { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value) }
          : { defaultValue: defaultValue ?? '' })}
        aria-invalid={!!error}
        className={className}
        {...props}
      />
    </FormField>
  );
}
