import { Head } from '@inertiajs/react';
import { PageHeader } from '@/components';
import DashboardLayout from '@/layouts/DashboardLayout';
import { LatestPayPeriodCard } from '@/pages/dashboard/components/LatestPayPeriodCard';
import { OverviewStats } from '@/pages/dashboard/components/OverviewStats';
import { RecentPeriodsList } from '@/pages/dashboard/components/RecentPeriodsList';
import { SectionHeader } from '@/pages/dashboard/components/SectionHeader';
import type { DashboardProps } from '@/pages/dashboard/types';

export default function Dashboard({
  stats,
  latestPeriod,
  latestPeriodStats,
  latestPayrolls,
  recentPeriods,
}: DashboardProps) {
  return (
    <>
      <Head title="Dashboard — Payrollz" />
      <DashboardLayout>
        <div className="flex min-h-0 flex-1 flex-col overflow-auto">
          <PageHeader title="Dashboard" />

          <div className="space-y-8">
            <section>
              <SectionHeader title="Overview" />
              <OverviewStats stats={stats} latestPeriodStats={latestPeriodStats} />
            </section>

            <div className="grid gap-8 lg:grid-cols-2">
              {latestPeriod && (
                <section>
                  <SectionHeader title="Latest pay period" />
                  <LatestPayPeriodCard
                    period={latestPeriod}
                    payrolls={latestPayrolls}
                  />
                </section>
              )}

              <section>
                <SectionHeader title="Recent pay periods" />
                <RecentPeriodsList periods={recentPeriods} />
              </section>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
