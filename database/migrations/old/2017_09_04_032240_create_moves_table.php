<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('moves', function (Blueprint $table) {
            $table->string('id', 100)->primary();
            $table->string('name', 100);
            $table->string('base_damage', 100);
            $table->string('base_energy', 100);
            $table->string('Category1_FK', 100);
            $table->string('Category2_FK', 100)->nullable();
            $table->string('Category3_FK', 100)->nullable();
            $table->text('description')->nullable();
            $table->text('effects')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('moves');
    }
}
