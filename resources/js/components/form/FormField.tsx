import * as React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: React.ReactNode;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  optional?: boolean;
}

export function FormField({
  label,
  htmlFor,
  error,
  children,
  className,
  optional,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {optional && (
          <span className="ml-1 font-normal text-muted-foreground">
            (optional)
          </span>
        )}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
