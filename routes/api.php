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

//Route::get('routes','UserAccountController@showRoutes');//php artisan config:clear got routes to show in terminal

//I'm going to have to manually create an OAuth user since the internal workings of /register route is a pain in the ass

Route::post('createOAuthUser','UserAccountController@createOAuthUser');

Route::get('/user/{user}', function (App\user $user) {
    return $user->email;
});

Route::get('/getCSRF', function () {
    return csrf_token();
});


/*
//https://stackoverflow.com/questions/39525968/laravels-5-3-passport-and-api-routes/40393694#40393694
//if I get no upstream error do composer dump-autoload
Route::post('/register-user', function (Request $request) {

    $name     = $request->input('name');
    $email    = $request->input('email');
    $password = $request->input('password');

    // save new user
    $user = \App\User::create([
        'name'     => $name,
        'email'    => $email,
        'password' => bcrypt($password),
    ]);


    // create oauth client
    $oauth_client = \App\OauthClient::create([
        'user_id'                => $user->id,
        'id'                     => $email,
        'name'                   => $name,
        'secret'                 => base64_encode(hash_hmac('sha256',$password, 'secret', true)),
        'password_client'        => 1,
        'personal_access_client' => 0,
        'redirect'               => '',
        'revoked'                => 0,
    ]);


    return [
        'message' => 'user successfully created.'
    ];
});


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