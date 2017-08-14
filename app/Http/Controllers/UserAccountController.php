<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use EllipseSynergie\ApiResponse\Contracts\Response;
use App\User;
use App\Transformer\UserAccountTransformer;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class UserAccountController extends Controller
{
    protected $response;

    public function __construct(Response $response)
    {
        $this->response = $response;
    }

    public function index()
    {
        //Get all users
        $userAccounts = User::paginate(15);
        // Return a collection of $task with pagination

        return $this->response->withPaginator($userAccounts, new  UserAccountTransformer());
    }

    public function show($id)
    {
        //Get the user
        $userAccount = User::find($id);
        if (!$userAccount) {
            return $this->response->errorNotFound('User Not Found');
        }
        // Return a single user account
        return $this->response->withItem($userAccount, new  UserAccountTransformer());
    }

    public function destroy($id)
    {
        //Get the user
        $userAccount = User::find($id);
        if (!$userAccount) {
            return $this->response->errorNotFound('User Not Found');
        }

        if($userAccount->delete()) {
            return $this->response->withItem($userAccount, new  UserAccountTransformer());
        } else {
            return $this->response->errorInternalError('Could not delete a user');
        }

    }

    public function store(Request $data)  {

        $validation = Validator::make($data, [
            //'sagename' => 'required|string|max:255',
            //'realname' => 'required|string|max:255',
            //'email' => 'required|string|email|max:255|unique:users',
            //'password' => 'required|string|min:6|confirmed',
        ]);

        if($validation) {
            $userAccount = User::create([
                'sagename' => $data['sagename'],
                'realname' => $data['realname'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);

            if ($userAccount->save()) {
                return $this->response->withItem($userAccount, new  UserAccountTransformer());
            } else {
                return $this->response->errorInternalError('Could not create a user account');
            }
        }
        else{
            return $this->response->errorInternalError('Invalid user credentials');
        }
    }

    public function edit(Request $request,$id)
    {
        $userAccount = User::find($id);
        if (!$userAccount) {
            return $this->response->errorNotFound('User Account ID Not Found');
        } else {
            $userAccount->id = $id;
            $userAccount->password = $request->input('password');
            $userAccount->sagename = $request->input('sagename');
            $userAccount->realname = $request->input('realname');
            $userAccount->email = $request->input('email');
        }

        if ($userAccount->save()) {
            return $this->response->withItem($userAccount, new  UserAccountTransformer());
        } else {
            return $this->response->errorInternalError('Could not create a user account');
        }
    }
    public function createOAuthUser(Request $request)
    {

        /*
         $v = validator($request->only('email', 'realname', 'password', 'sagename'), [
             'realname' => 'required|string|max:255',
             'sagename' => 'required|string|max:255',
             'email' => 'required|string|email|max:255|unique:users',
             'password' => 'required|string|min:6',
         ]);

         if ($v->fails()) {
             return response()->json($v->errors()->all(), 400);
         }

         $data = request()->only('email', 'realname', 'password', 'sagename');

         \App\User::create([
             'realname' => $data['realname'],
             'sagename' => $data['sagename'],
             'email' => $data['email'],
             'password' => bcrypt($data['password']),
         ]);

         $client = \Laravel\Passport\Client::where('password_client', 1)->first();

         $request->request->add([
             'grant_type' => 'password',
             'client_id' => $client->id,
             'client_secret' => $client->secret,
             'username' => $data['sagename'],
             'password' => $data['password'],
             'scope' => null,
         ]);

         // Fire off the internal request.

         $request2 = Request::create('oauth/token', 'POST');
         $request2->header('Access-Control-Allow-Origin', '*');
         Route::dispatch($request2);
         $response = Route::dispatch($request2);
         return($response);
     }
     /*csrf_token()
     public function showRoutes()
     {
         $routeCollection = Route::getRoutes();

         echo "<table style='width:100%'>";
         echo "<tr>";
         echo "<td width='10%'><h4>HTTP Method</h4></td>";
         echo "<td width='10%'><h4>Route</h4></td>";
         echo "<td width='80%'><h4>Corresponding Action</h4></td>";
         echo "</tr>";
         foreach ($routeCollection as $value) {
             echo "<tr>";
             echo "<td>" . $value->getMethods()[0] . "</td>";
             echo "<td>" . $value->getPath() . "</td>";
             echo "<td>" . $value->getActionName() . "</td>";
             echo "</tr>";
         }
         echo "</table>";
     }
 */
    }
}
