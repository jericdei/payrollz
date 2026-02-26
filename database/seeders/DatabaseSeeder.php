<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Payroll;
use App\Models\PayrollItem;
use App\Models\PayrollPeriod;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->seedUsers();
        $employees = $this->seedEmployees();
        $periods = $this->seedPayrollPeriods();
        $this->seedPayrolls($employees, $periods);
    }

    private function seedUsers(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@payrollz.com',
        ]);
    }

    private function seedEmployees()
    {
        return Employee::factory()->count(20)->create();
    }

    private function seedPayrollPeriods()
    {
        $periods = collect();
        $now = now();

        for ($i = 2; $i >= 0; $i--) {
            $periods->push(
                PayrollPeriod::factory()->create([
                    'date_start' => $now->copy()->subMonths($i)->startOfMonth(),
                    'date_end' => $now->copy()->subMonths($i)->startOfMonth()->addDays(14),
                    'pay_date' => $now->copy()->subMonths($i)->startOfMonth()->addDays(21),
                    'status' => $i === 0 ? 'draft' : 'finalized',
                ])
            );
        }

        return $periods;
    }

    private function seedPayrolls($employees, $periods)
    {
        foreach ($periods as $period) {
            $employees->random(min(15, $employees->count()))->each(function (Employee $employee) use ($period) {
                $grossPay = $employee->basic_salary
                    ? (float) $employee->basic_salary
                    : (float) ($employee->daily_rate ?? 500) * 22;

                $deductions = collect([
                    'SSS' => $grossPay * 0.045,
                    'PHILHEALTH' => $grossPay * 0.04,
                    'PAGIBIG' => 100,
                ])->map(fn ($amount) => round($amount, 2));

                $totalDeductions = $deductions->sum();
                $netPay = round($grossPay - $totalDeductions, 2);

                $payroll = Payroll::factory()->create([
                    'employee_id' => $employee->id,
                    'payroll_period_id' => $period->id,
                    'gross_pay' => $grossPay,
                    'total_earnings' => $grossPay,
                    'total_deductions' => $totalDeductions,
                    'net_pay' => $netPay,
                ]);

                foreach ($deductions as $code => $amount) {
                    PayrollItem::factory()->deduction()->create([
                        'payroll_id' => $payroll->id,
                        'code' => $code,
                        'description' => $code,
                        'amount' => $amount,
                    ]);
                }

                PayrollItem::factory()->earning()->create([
                    'payroll_id' => $payroll->id,
                    'code' => 'BASIC',
                    'description' => 'Basic salary',
                    'amount' => $grossPay,
                ]);
            });
        }
    }
}
