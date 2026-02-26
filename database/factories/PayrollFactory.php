<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Payroll;
use App\Models\PayrollPeriod;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payroll>
 */
class PayrollFactory extends Factory
{
    protected $model = Payroll::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $grossPay = $this->faker->randomFloat(2, 10000, 50000);
        $totalDeductions = $this->faker->randomFloat(2, 1000, $grossPay * 0.3);
        $netPay = $grossPay - $totalDeductions;

        return [
            'employee_id' => Employee::factory(),
            'payroll_period_id' => PayrollPeriod::factory(),
            'gross_pay' => $grossPay,
            'total_earnings' => $grossPay,
            'total_deductions' => $totalDeductions,
            'net_pay' => $netPay,
        ];
    }
}
