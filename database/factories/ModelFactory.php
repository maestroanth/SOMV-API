<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\UserAccount::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'sagename' => $faker->name,
        'realname' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('test123'),
        'remember_token' => str_random(10),
    ];
});

/*
 *          $table->increments('id');
            $table->string('sagename');
            $table->string('realname');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
 */