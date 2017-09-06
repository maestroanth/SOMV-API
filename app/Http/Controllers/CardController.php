<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Card;
use App\Universe;
use App\User;
use EllipseSynergie\ApiResponse\Contracts\Response;
use App\Transformer\UserAccountTransformer;

class CardController extends Controller
{
    protected $response;

    public function __construct(Response $response)
    {
        $this->response = $response;
    }


    public function getAllUniverses()
    {
        $this->response = Universe::all();
        return $this->response;
    }

    public function getUniverse($id)
    {
        $id = (int)$id;
        //a potential bug here is if a userid is passed through returning a user
        $this->response = Universe::where('id', $id)->first();
        return $this->response;
    }

    public function getCardCollection($userID)
    {
        $userID = (int)$userID;
        $this->response = Card::where('FK_userID', $userID)->all();
        return $this->response;
    }

    public function grantNewCard(Request $request, $id)
    {
        $userAccount = User::find($id);
        $newCard = new Card;
        $this->response = User::where('id', $id)->first();
        if(!$userAccount)
        {
            return $this->response->errorInternalError('Could not find your sage, please try re-logging');
        }
        else {

            try {

                //Step 1. Generate the Card (This will be after user modifications)
                $newCard->name = $request->input('name');
                $newCard->description = $request->input('description');

                $newCard->FK_base_universe = $request->input('FK_base_universe');

                $newCard->Force_Name_1 = $request->input('Force_Name_1');
                $newCard->Strength_Force_1 = $request->input('Strength_Force_1');
                $newCard->Force_Name_2 = $request->input('Force_Name_2');
                $newCard->Strength_Force_2 = $request->input('Strength_Force_2');
                $newCard->Force_Name_3 = $request->input('Force_Name_3');
                $newCard->Strength_Force_3 = $request->input('Strength_Force_3');
                $newCard->Force_Name_4 = $request->input('Force_Name_4');
                $newCard->Strength_Force_4 = $request->input('Strength_Force_4');


                $newCard->Concept_Name_1 = $request->input('Concept_Name_1');
                $newCard->Strength_Concept_1 = $request->input('Strength_Concept_1');
                $newCard->Concept_Name_2 = $request->input('Concept_Name_2');
                $newCard->Strength_Concept_2 = $request->input('Strength_Concept_2');
                $newCard->Concept_Name_3 = $request->input('Concept_Name_3');
                $newCard->Strength_Concept_3 = $request->input('Strength_Concept_3');
                $newCard->Concept_Name_4 = $request->input('Concept_Name_4');
                $newCard->Strength_Concept_4 = $request->input('Strength_Concept_4');

                $newCard->FK_Move_1 = $request->input('FK_Move_1');
                $newCard->FK_Move_2 = $request->input('FK_Move_2');
                $newCard->FK_Move_3 = $request->input('FK_Move_3');
                $newCard->FK_Move_4 = $request->input('FK_Move_4');
                $newCard->FK_Move_Ultimate = $request->input('FK_Move_Ultimate');


                //Step 2. Assign the FK to user
                $newCard->FK_userID = $id;

                if ($newCard->save()) {//this line is important because the ->save is what actually saves it into the DB even though it is in an 'if' statement
                    return $this->response = 'Congratulations, a new Universe has been added to your Multiverse!' + $newCard;
                } else {
                    return $this->response->errorInternalError('Could not create new Universe card.');
                }
            }
            catch (Exception $e){
                return $this->response->errorInternalError('Could not create new Universe card.');
            }

        }
    }
}
