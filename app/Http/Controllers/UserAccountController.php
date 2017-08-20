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
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

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

    public function store(Request $request)  {
//
        $responseItem = new User;
        $client = new Client();

        $userAccount = array(
            'id' => $request->input('id'),
            'password' => $request->input('password'),
            'sagename' => $request->input('sagename'),
            'realname' => $request->input('realname'),
            'email' => $request->input('email'),
        );
        /*
        Validator::make($userAccount, [
            'sagename' => 'required|string|max:255',
            'realname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'password' => 'required|string|min:6|confirmed',
        ]);
        */

        $responseItem = User::create([
            'sagename' => $userAccount['sagename'],
            'realname' => $userAccount['realname'],
            'email' => $userAccount['email'],
            'password' => bcrypt($userAccount['password']),
        ]);



        if ($responseItem->save()) {
            return $this->response->withItem($responseItem, new  UserAccountTransformer());
        } else {
            return $this->response->errorInternalError('Could not create a user account');
        }

    }

    public function edit(Request $request,$id)
    {
        $userAccount = User::find($id);

        /*
         * Since it is the 'sagename' that is going to be a unique identifier only changed through ME,
         * if it doesn't match the id they are sending to request the change, I'll boot it.
         *
         * This is custom
         * programmed to only edit one input at a time other than sagename or id,
         * so only one input should be sent through request with correct key:entry JSON
         * along with the user's sage name and PK id
         *
         */
        $input = $request->input();
        if (!$userAccount) {
            return $this->response->errorNotFound('User Account ID Not Found');
        } else {
            if ($userAccount->sagename != $input['sagename'])
            {
                //echo $userAccount->sagename ;
                return $this->response->errorNotFound('You are not allowed to edit this account. If you wish to change your sagename, please contact Admin to change your sagename at https:\/\/www.netdoodler.com');
            }
            else {

                if (isset($input['password'])){
                    $userAccount->password = $request->input('password');
                }
                if (isset($input['realname'])){
                    $userAccount->password = $request->input('realname');
                }
                if (isset($input['email'])){
                    $userAccount->password = $request->input('email');
                }
            }

            if ($userAccount->save()) {
                return $this->response->withItem($userAccount, new  UserAccountTransformer());
            } else {
                return $this->response->errorInternalError('Could not create a user account');
            }
        }
    }
}
