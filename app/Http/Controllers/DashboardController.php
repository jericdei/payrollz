<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Payroll;
use App\Models\PayrollPeriod;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $employeesCount = Employee::query()->count();
        $activeEmployeesCount = Employee::query()->where('status', 'active')->count();

        $latestPeriod = PayrollPeriod::query()
            ->latest('date_end')
            ->first();

        $latestPeriodStats = null;
        $recentPeriods = [];
        $latestPayrolls = [];

        if ($latestPeriod) {
            $latestPayrollsQuery = Payroll::query()
                ->with('employee')
                ->where('payroll_period_id', $latestPeriod->id)
                ->orderBy('net_pay', 'desc')
                ->limit(5);

            $latestPayrolls = $latestPayrollsQuery->get()->map(fn ($p) => [
                'id' => $p->id,
                'employee_name' => $p->employee->first_name.' '.$p->employee->last_name,
                'employee_number' => $p->employee->employee_number,
                'gross_pay' => (float) $p->gross_pay,
                'total_deductions' => (float) $p->total_deductions,
                'net_pay' => (float) $p->net_pay,
            ]);

            $latestPeriodStats = [
                'total_net_pay' => (float) Payroll::query()
                    ->where('payroll_period_id', $latestPeriod->id)
                    ->sum('net_pay'),
                'payrolls_count' => Payroll::query()
                    ->where('payroll_period_id', $latestPeriod->id)
                    ->count(),
            ];

            $recentPeriods = PayrollPeriod::query()
                ->latest('date_end')
                ->limit(5)
                ->get()
                ->map(fn ($p) => [
                    'id' => $p->id,
                    'date_start' => $p->date_start->format('M j'),
                    'date_end' => $p->date_end->format('M j, Y'),
                    'pay_date' => $p->pay_date->format('M j, Y'),
                    'status' => $p->status,
                    'total_net_pay' => (float) Payroll::query()
                        ->where('payroll_period_id', $p->id)
                        ->sum('net_pay'),
                    'payrolls_count' => Payroll::query()
                        ->where('payroll_period_id', $p->id)
                        ->count(),
                ]);
        }

        return Inertia::render('dashboard', [
            'stats' => [
                'employees_count' => $employeesCount,
                'active_employees_count' => $activeEmployeesCount,
            ],
            'latestPeriod' => $latestPeriod ? [
                'id' => $latestPeriod->id,
                'date_start' => $latestPeriod->date_start->format('M j'),
                'date_end' => $latestPeriod->date_end->format('M j, Y'),
                'pay_date' => $latestPeriod->pay_date->format('M j, Y'),
                'status' => $latestPeriod->status,
            ] : null,
            'latestPeriodStats' => $latestPeriodStats,
            'latestPayrolls' => $latestPayrolls,
            'recentPeriods' => $recentPeriods,
        ]);
    }
}
