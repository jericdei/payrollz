export interface DashboardStats {
  employees_count: number;
  active_employees_count: number;
}

export interface DashboardPeriod {
  id: string;
  date_start: string;
  date_end: string;
  pay_date: string;
  status: string;
}

export interface DashboardPeriodStats {
  total_net_pay: number;
  payrolls_count: number;
}

export interface DashboardPayroll {
  id: string;
  employee_name: string;
  employee_number: string;
  gross_pay: number;
  total_deductions: number;
  net_pay: number;
}

export interface DashboardRecentPeriod extends DashboardPeriod {
  total_net_pay: number;
  payrolls_count: number;
}

export interface DashboardProps {
  stats: DashboardStats;
  latestPeriod: DashboardPeriod | null;
  latestPeriodStats: DashboardPeriodStats | null;
  latestPayrolls: DashboardPayroll[];
  recentPeriods: DashboardRecentPeriod[];
}
