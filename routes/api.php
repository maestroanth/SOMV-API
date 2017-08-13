<?php

use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// get list of accounts
Route::get('accounts','UserAccountController@index');
// get specific user
Route::get('account/{id}','UserAccountController@show');
// delete a user
Route::delete('account/{id}','UserAccountController@destroy');
// update existing user
//Route::put('account','UserAccountController@store'); Laravel doesn't do 'puts' officially apparently
// create new user
Route::post('account/post','UserAccountController@store');
Route::post('account/edit/{id}','UserAccountController@edit');

/*

*****USER JSON FORMAT (NOTE DO NOT ADD ID IN JSON THAT IS AUTO OR IN URL FOR UPDATES****
 * {
        "sagename": "Dr. ghkgjkr I",
        "realname": "Giofuckyou Keeling",
        "email": "padberg.helga@example.org",
        "password": "$2y$10$enI1x1swJThnKhJQ8WQ5iO/4FIZHjlztKYuhIktwowo6tly/aDQ4O"
}
 */