<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatUniverseCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('universes', function (Blueprint $table) {
            $table->string('id', 100)->primary();
            $table->string('name', 100);
            $table->text('description')->nullable();
            $table->string('Like_Ours');
            $table->string('Rarity');
            $table->string('ForceFK_1')->nullable();
            $table->string('Strength_Force_1');
            $table->string('ForceFK_2')->nullable();
            $table->string('Strength_Force_2');
            $table->string('ForceFK_3')->nullable();
            $table->string('Strength_Force_3');
            $table->string('PhenomenaFK_1')->nullable();
            $table->string('Strength_Phenomena_1');
            $table->string('PhenomenaFK_2')->nullable();
            $table->string('Strength_Phenomena_2');
            $table->string('PhenomenaFK_3')->nullable();
            $table->string('Strength_Phenomena_3');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('universes');
    }
}
