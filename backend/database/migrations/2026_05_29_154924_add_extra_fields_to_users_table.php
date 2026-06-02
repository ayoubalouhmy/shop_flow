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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->date('birthday')->nullable()->after('phone');
            $table->integer('loyalty_points')->default(0)->after('role');
            $table->decimal('total_savings', 10, 2)->default(0)->after('loyalty_points');
            $table->timestamp('member_since')->nullable()->after('total_savings');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'birthday', 'loyalty_points', 'total_savings', 'member_since']);
        });
    }
};
