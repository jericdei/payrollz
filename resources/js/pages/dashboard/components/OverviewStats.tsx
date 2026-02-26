import { Banknote, GraduationCap, Users } from 'lucide-react';
import { StatCard } from '@/components';
import { formatPeso } from '@/lib/format';
import type { DashboardStats, DashboardPeriodStats } from '../types';

interface OverviewStatsProps {
  stats: DashboardStats;
  latestPeriodStats: DashboardPeriodStats | null;
}

export function OverviewStats({ stats, latestPeriodStats }: OverviewStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={Users}
        value={stats.employees_count}
        label="Total employees"
      />
      <StatCard
        icon={Users}
        value={stats.active_employees_count}
        label="Active employees"
      />
      {latestPeriodStats && (
        <>
          <StatCard
            icon={Banknote}
            value={formatPeso(latestPeriodStats.total_net_pay)}
            label="Latest period total"
          />
          <StatCard
            icon={GraduationCap}
            value={latestPeriodStats.payrolls_count}
            label="Payrolls in latest period"
          />
        </>
      )}
    </div>
  );
}
