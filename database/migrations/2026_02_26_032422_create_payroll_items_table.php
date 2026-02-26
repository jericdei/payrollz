<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payroll_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('payroll_id')->constrained()->cascadeOnDelete();

            $table->enum('type', ['earning', 'deduction']);
            $table->string('code'); // BASIC, OT, SSS, PHILHEALTH, PAGIBIG, TAX, BONUS
            $table->string('description')->nullable();
            $table->decimal('amount', 12, 2);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_items');
    }
};
