<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOauthAuthCodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('races', function (Blueprint $table) {
            $table->string('id', 100)->primary();
            $table->string('birth_universe', 100)->foreign();
            $table->integer('base_intuition');
            $table->integer('base_experimentation');
            $table->integer('base_intelligence');
            $table->integer('base_imagination');
            $table->integer('base_sanity');
            $table->integer('base_power_rate');
            $table->text('race_name');
            $table->text('racial_bonuses')->nullable();
            $table->text('description')->nullable();
            $table->text('personality')->nullable();
            $table->boolean('is_locked');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('oauth_auth_codes');
    }
}
