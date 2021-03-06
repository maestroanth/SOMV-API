<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Race;
use App\User;
use EllipseSynergie\ApiResponse\Contracts\Response;
use App\Transformer\UserAccountTransformer;

class RaceDataController extends Controller
{
    protected $response;

    public function __construct(Response $response)
    {
        $this->response = $response;
    }

    public function getAllRaceData()
    {
        $this->response = Race::all();
        return $this->response;
    }

    public function getRaceData($id)
    {
        $id = (int)$id;
        $this->response = Race::where('id', $id)->first();
        return $this->response;
    }

    public function storeNewRaceData(Request $request, $id)
    {
        $userAccount = User::find($id);

        $this->response = User::where('id', $id)->first();
        if(!$userAccount)
        {
            return $this->response->errorInternalError('Could not create your sage, please try re-logging');
        }
        else {

            try {
                $userAccount->FK_Race = $request->input('FK_Race');
                $userAccount->Intuition = $request->input('Intuition');
                $userAccount->Ingenuity = $request->input('Ingenuity');
                $userAccount->Inquisitiveness = $request->input('Inquisitiveness');
                $userAccount->Intelligence = $request->input('Intelligence');
                $userAccount->Invigoration = $request->input('Invigoration');
                $userAccount->Insanity_Control = $request->input('Insanity_Control');
                $userAccount->Chosen_Image = $request->input('Chosen_Image');
                $userAccount->Level = 1;
                $userAccount->Sage_Created = 1;
                if ($userAccount->save()) {//this line is important because the ->save is what actually saves it into the DB even though it is in an 'if' statement
                    return $this->response = User::where('id', $id)->first();
                } else {
                    return $this->response->errorInternalError('Could not create a sage profile.');
                }
            }
            catch (Exception $e){
                return $this->response->errorInternalError('Could not create a sage profile.');
            }

        }
    }
}
