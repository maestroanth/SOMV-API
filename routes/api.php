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
//Route::get('accounts','UserAccountController@index');
// get specific user
//Route::get('account/{id}','UserAccountController@show');
// delete a user
Route::post('account/delete/{id}','UserAccountController@destroy')->middleware('auth:api');
// update existing user
//Route::put('account','UserAccountController@store'); Laravel doesn't do 'puts' officially apparently
// create new user
Route::post('account/post','UserAccountController@store')->middleware('client');
Route::post('account/edit/{id}','UserAccountController@edit')->middleware('auth:api');

Route::get('races','RaceDataController@getAllRaceData')->middleware('auth:api');
Route::get('race/{id}','RaceDataController@getRaceData')->middleware('auth:api');

Route::get('tooltips/{category}','ToolTipController@getToolTipData')->middleware('auth:api');
Route::get('tooltips','ToolTipController@getAllToolTipData')->middleware('auth:api');

Route::post('new-sage/{id}','RaceDataController@storeNewRaceData')->middleware('auth:api');
//Route::get('routes','UserAccountController@showRoutes');//php artisan config:clear got routes to show in terminal
Route::get('universe-category/{id}','CardController@getUniverse')->middleware('auth:api');
Route::get('universes','CardController@getAllUniverses')->middleware('auth:api');
Route::get('collection/{id}','CardController@getCardCollection')->middleware('auth:api');
Route::post('generate-card/{id}','CardController@grantNewCard')->middleware('auth:api');
Route::post('update-card/{id}','CardController@updateCardNameDescription')->middleware('auth:api');
Route::get('moves','CardController@getAllMoves')->middleware('auth:api');
Route::get('keywords','CardController@getAllKeywords')->middleware('auth:api');

Route::post('destroy-cards/{id}','CardController@destroyCards')->middleware('auth:api');
Route::post('destroy-card/{id}','CardController@destroyCard')->middleware('auth:api');
//I'm going to have to manually create an OAuth user since the internal workings of /register route is a pain in the ass




/*
Route::get('/user/{user}', function (App\user $user) {
    return $user->email;
});
*/

/*
 * 4 types of Oauth grants + "Refresh Grant"
 *
 *Authorization Grant: AKA 3-legged Oauth. Authorized by third party. Flow: Tell user they can login via Facebook.
 *After login, Facebook asks the user if they want to authorize my application to access their user info on Facebook.
 *Once approved, the user will be redirected to our apps URL with a callback along with and authorization code.
 * My applications then uses this code to obtain an access token from Facebook which can be used to get the user details.
 *Creative point: this could be a cool thing to do as bonus 'universe card' related to Facebook. However, they still need
 * to create a 'sagename' for this app specifically.
 *
 * Implicit Grant: Similar to authorization, except the authorization server (Facebook) sends the authorization token
 * instead of the authorization code to bounce back again.
 * Creative Point: This will be the grant I want since I want this app to be decoupled as much from the server as possible
 * if I want to use 3rd party authorization.  Plus, that 3rd extra step seems needlessly heinous.
 *
 * Resource Owner Password Credentials Grant: For dealing with a client we trust like a first party app for
 * our own website. The client sends login credentials to authorization server and the server directly issues
 * the access token.
 *
 * Client Credentials Grant: A grant where no user interaction required (machine to machine communication).
 * I.e. the app wants to show a catalog to the user or store some data related to the app on the server.
 *
 * Refresh token grant: When server issues access token, it also sets an expiration for that token. The authorization
 * server will send a refresh token while issuing the access token, which can be used to request a new access token.
 * This flow is not available when using Implicit Grants.s
 *
 *
 *
 * For current purposes this app will only use the Password Credentials and Refresh token grants.
 * Later on, I'll try to get a google API login integration going with google oauth playground which I was
 * able to get working.  This would be great for a real "business" case where employers would like to
 * see this implementation in my app, but serves hollow use cases for this particular app.
 *
 *
 * Password Grant Laravel Tutorial: https://laracasts.com/series/whats-new-in-laravel-5-3/episodes/13
 */

/*

*****USER JSON FORMAT (NOTE DO NOT ADD ID IN JSON THAT IS AUTO OR IN URL FOR UPDATES****
 * {
        "sagename": "Dr. ghkgjkr I",
        "realname": "Giofuckyou Keeling",
        "email": "padberg.helga@example.org",
        "password": "$2y$10$enI1x1swJThnKhJQ8WQ5iO/4FIZHjlztKYuhIktwowo6tly/aDQ4O"
}
 */