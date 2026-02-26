import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components';
import { formatPeso } from '@/lib/format';
import type { DashboardRecentPeriod } from '../types';

interface RecentPeriodsListProps {
  periods: DashboardRecentPeriod[];
}

export function RecentPeriodsList({ periods }: RecentPeriodsListProps) {
  if (periods.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">No pay periods yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {periods.map((period) => (
        <Card
          key={period.id}
          className="transition-colors hover:bg-muted/50"
        >
          <CardContent className="flex flex-row items-center justify-between py-4">
            <div>
              <p className="font-medium">
                {period.date_start} – {period.date_end}
              </p>
              <p className="text-sm text-muted-foreground">
                {period.payrolls_count} payrolls · {formatPeso(period.total_net_pay)}
              </p>
            </div>
            <StatusBadge status={period.status} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
