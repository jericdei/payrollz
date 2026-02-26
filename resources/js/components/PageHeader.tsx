import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, action, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6',
        className,
      )}
    >
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {action}
    </div>
  );
}
