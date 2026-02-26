<?php

namespace Database\Factories;

use App\Models\Payroll;
use App\Models\PayrollItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PayrollItem>
 */
class PayrollItemFactory extends Factory
{
    protected $model = PayrollItem::class;

    private const EARNING_CODES = ['BASIC', 'OT', 'BONUS', 'HOLIDAY', 'ALLOWANCE'];

    private const DEDUCTION_CODES = ['SSS', 'PHILHEALTH', 'PAGIBIG', 'TAX', 'LOAN'];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['earning', 'deduction']);
        $codes = $type === 'earning' ? self::EARNING_CODES : self::DEDUCTION_CODES;
        $code = $this->faker->randomElement($codes);

        return [
            'payroll_id' => Payroll::factory(),
            'type' => $type,
            'code' => $code,
            'description' => $this->faker->optional()->sentence(),
            'amount' => $this->faker->randomFloat(2, 100, 10000),
        ];
    }

    public function earning(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'earning',
            'code' => $this->faker->randomElement(self::EARNING_CODES),
        ]);
    }

    public function deduction(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'deduction',
            'code' => $this->faker->randomElement(self::DEDUCTION_CODES),
        ]);
    }
}
