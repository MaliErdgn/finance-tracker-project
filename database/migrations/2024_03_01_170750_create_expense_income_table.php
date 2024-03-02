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
        Schema::create('expense_income', function (Blueprint $table) {
            $table->id();
            $table->integer("amount");
            $table->dateTime("time");
            $table->string("description");
            $table->unsignedBigInteger("type_id");
            $table->unsignedBigInteger("tag_id");
            $table->unsignedBigInteger("method_id");
            $table->timestamps();

            $table->foreign("type_id")->references("id")->on("types");
            $table->foreign("tag_id")->references("id")->on("tags");
            $table->foreign("method_id")->references("id")->on("methods");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expense_income');
    }
};
