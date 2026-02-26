<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_number' => $this->faker->unique()->numerify('EMP####'),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'middle_name' => $this->faker->optional()->firstName(),
            'birthdate' => $this->faker->optional()->date(),
            'hire_date' => $this->faker->date(),
            'employment_type' => $this->faker->randomElement(['regular', 'probationary', 'contractor']),
            'salary_type' => $this->faker->randomElement(['monthly', 'daily', 'weekly', 'semi-monthly']),
            'basic_salary' => $this->faker->optional()->randomFloat(2, 0, 20000),
            'daily_rate' => $this->faker->optional()->randomFloat(2, 0, 1000),
            'status' => $this->faker->randomElement(['active', 'resigned', 'terminated']),
            'sss_number' => $this->faker->optional()->numerify('SSS####'),
            'philhealth_number' => $this->faker->optional()->numerify('PHILHEALTH####'),
            'pagibig_number' => $this->faker->optional()->numerify('PAGIBIG####'),
            'tin_number' => $this->faker->optional()->numerify('TIN####'),
        ];
    }
}
