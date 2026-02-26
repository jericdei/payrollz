import type { VariantProps } from 'class-variance-authority';
import { Badge } from '@/components/ui/badge';
import type { badgeVariants } from '@/components/ui/badge';
import { cn, capitalize } from '@/lib/utils';

const statusVariants: Record<string, VariantProps<typeof badgeVariants>['variant']> = {
  active: 'success',
  resigned: 'muted',
  terminated: 'destructive',
  inactive: 'muted',
  draft: 'muted',
  processing: 'default',
  finalized: 'success',
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant =
    statusVariants[status.toLowerCase()] ?? statusVariants.inactive;

  return (
    <Badge
      variant={variant}
      className={cn('w-20 px-2.5', className)}
    >
      {capitalize(status)}
    </Badge>
  );
}
