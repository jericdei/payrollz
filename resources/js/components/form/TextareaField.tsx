import * as React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from './FormField';

type TextareaFieldBase = Omit<React.ComponentProps<typeof Textarea>, 'id'> & {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
};

type TextareaFieldControlled = TextareaFieldBase & {
  value: string;
  onChange: (value: string) => void;
  defaultValue?: never;
};

type TextareaFieldUncontrolled = TextareaFieldBase & {
  value?: never;
  onChange?: never;
  defaultValue?: string;
};

type TextareaFieldProps = TextareaFieldControlled | TextareaFieldUncontrolled;

export function TextareaField({
  label,
  name,
  value,
  onChange,
  defaultValue,
  error,
  optional,
  className,
  ...props
}: TextareaFieldProps) {
  const isControlled = value !== undefined;
  return (
    <FormField label={label} htmlFor={name} error={error} optional={optional}>
      <Textarea
        id={name}
        name={name}
        {...(isControlled
          ? { value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.target.value) }
          : { defaultValue: defaultValue ?? '' })}
        aria-invalid={!!error}
        className={className}
        {...props}
      />
    </FormField>
  );
}
