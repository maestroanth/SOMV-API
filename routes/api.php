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


//OAuth2 Routes
Route::get('/redirect', function () {

    $query = http_build_query([
        'client_id' => '3',
        'redirect_uri' => 'http://client.local/callback',
        'response_type' => 'code',
        'scope' => ''
    ]);

    return redirect('http://server.local/oauth/authorize?'.$query);
});

Route::get('/callback', function (Illuminate\Http\Request $request) {
    $http = new \GuzzleHttp\Client;

    $response = $http->post('http://server.local/oauth/token', [
        'form_params' => [
            'client_id' => '3',
            'client_secret' => 'iX8YZrI198wwlFrBpfNSl8C2h7eTk1rQKMg28Qcm',
            'grant_type' => 'authorization_code',
            'redirect_uri' => 'http://client.local/callback',
            'code' => $request->code,
        ],
    ]);
    return json_decode((string) $response->getBody(), true);
});

Route::get('/user/{user}', function (App\user $user) {
    return $user->email;
});

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

*****USER JSON FORMAT (NOTE DO NOT ADD ID IN JSON THAT IS AUTO OR IN URL FOR UPDATES****
 * {
        "sagename": "Dr. ghkgjkr I",
        "realname": "Giofuckyou Keeling",
        "email": "padberg.helga@example.org",
        "password": "$2y$10$enI1x1swJThnKhJQ8WQ5iO/4FIZHjlztKYuhIktwowo6tly/aDQ4O"
}
 */