import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  value: React.ReactNode;
  label: string;
  className?: string;
}

export function StatCard({ icon: Icon, value, label, className }: StatCardProps) {
  return (
    <Card className={cn('px-6', className)}>
      <CardContent className="flex items-center gap-4 pt-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#eef2ed] dark:bg-[#1a2418]">
          <Icon className="h-6 w-6 text-[#2d5a27] dark:text-[#6b9c64]" />
        </div>
        <div>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
