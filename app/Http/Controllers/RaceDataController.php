<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Race;
use EllipseSynergie\ApiResponse\Contracts\Response;


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

        if(!$userAccount)
        {
            return $this->response->errorInternalError('Could not create your sage, please try re-logging');
        }
        else {


            $userAccount = array(
                'Intuition' => $request->input('Intuition'),
                'Ingenuity' => $request->input('Ingenuity'),
                'Inquisitiveness' => $request->input('Inquisitiveness'),
                'Intelligence' => $request->input('Intelligence'),
                'Invigoration' => $request->input('Invigoration'),
                'Insanity_Control' => $request->input('Insanity_Control'),
                'Chosen_Image' => $request->input('Chosen_Image'),
                'Level' => 1,
                'Sage_Created' => 1,

            );

            return $this->response->withItem($userAccount, new  UserAccountTransformer());
        }
    }
}
