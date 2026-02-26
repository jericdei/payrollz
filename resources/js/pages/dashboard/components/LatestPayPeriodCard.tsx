import { StatusBadge } from '@/components';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPeso } from '@/lib/format';
import type { DashboardPeriod, DashboardPayroll } from '../types';

interface LatestPayPeriodCardProps {
  period: DashboardPeriod;
  payrolls: DashboardPayroll[];
}

export function LatestPayPeriodCard({ period, payrolls }: LatestPayPeriodCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-medium">
              {period.date_start} – {period.date_end}
            </p>
            <p className="text-sm text-muted-foreground">Pay date: {period.pay_date}</p>
          </div>
          <StatusBadge status={period.status} />
        </div>
        {payrolls.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead className="text-right">Net pay</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrolls.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell>
                    <span className="font-medium">{payroll.employee_name}</span>
                    <span className="ml-1 font-mono text-xs text-muted-foreground">
                      {payroll.employee_number}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatPeso(payroll.net_pay)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">No payrolls in this period yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
