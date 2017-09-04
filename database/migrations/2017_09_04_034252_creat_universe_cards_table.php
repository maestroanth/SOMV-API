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
        Schema::create('universe_cards', function (Blueprint $table) {
            $table->string('id', 100)->primary();
            $table->string('name', 100);
            $table->string('description', 100)->nullable();
            $table->string('FK_userID', 100);
            $table->string('FK_base_universe', 100);
            $table->string('Force_Name_1')->nullable();
            $table->string('Strength_Force_1');
            $table->string('Force_Name_2')->nullable();
            $table->string('Strength_Force_2');
            $table->string('Force_Name_3')->nullable();
            $table->string('Strength_Force_3');
            $table->string('Force_Name_4')->nullable();
            $table->string('Strength_Force_4');

            $table->string('Concept_Name_1')->nullable();
            $table->string('Concept_Str_1');
            $table->string('Concept_Name_2')->nullable();
            $table->string('Concept_Str_2');
            $table->string('Concept_Name_3')->nullable();
            $table->string('Concept_Str_3');
            $table->string('Concept_Name_4')->nullable();
            $table->string('Concept_Str_4');

            $table->string('FK_Move_1');
            $table->string('FK_Move_2');
            $table->string('FK_Move_3');
            $table->string('FK_Move_4');
            $table->string('FK_Move_Ultimate');


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
