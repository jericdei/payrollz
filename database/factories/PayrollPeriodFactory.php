<?php

namespace Database\Factories;

use App\Models\PayrollPeriod;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PayrollPeriod>
 */
class PayrollPeriodFactory extends Factory
{
    protected $model = PayrollPeriod::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $dateEnd = $this->faker->dateTimeBetween('-1 month', 'now');
        $dateStart = (clone $dateEnd)->modify('-14 days');
        $payDate = (clone $dateEnd)->modify('+7 days');

        return [
            'date_start' => $dateStart->format('Y-m-d'),
            'date_end' => $dateEnd->format('Y-m-d'),
            'pay_date' => $payDate->format('Y-m-d'),
            'status' => $this->faker->randomElement(['draft', 'processing', 'finalized']),
        ];
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'draft']);
    }

    public function processing(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'processing']);
    }

    public function finalized(): static
    {
        return $this->state(fn (array $attributes) => ['status' => 'finalized']);
    }
}
