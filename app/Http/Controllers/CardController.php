<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Card;
use App\Universe;
use App\Move;
use App\User;
use EllipseSynergie\ApiResponse\Contracts\Response;
use App\Transformer\UserAccountTransformer;
use Illuminate\Support\Collection;

class CardController extends Controller
{
    protected $response;
    protected $newCard;
    protected $cardCollection;
    public function __construct(Response $response)
    {
        $this->response = $response;
    }


    public function getAllUniverses()
    {
        $this->response = Universe::all();
        return $this->response;
    }

    public function getAllMoves()
    {
        $this->response = Move::all();
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
        $this->cardCollection = Card::where('FK_userID', $userID)->get();
        $this->response = json_encode($this->cardCollection );
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

                    return $this->response = json_encode($newCard);//remember to do json_encode from now on
                } else {
                    return $this->response->errorInternalError('Could not create new Universe card.');
                }
            }
            catch (Exception $e){
                return $this->response->errorInternalError('Could not create new Universe card.');
            }

        }
    }

    public function destroyCards(Request $request, $id)
    {

        /*
         * Delete cards and then refund to User %20 Energy Value
         *
         *
         * Pending issue is that it only deletes the first card sent from request still 11-19-2017
         *
         * The other is the response is sending back null or '0' 11-19-2017
         *
         */
        //Get the user
        $userAccount = User::find($id);
        $card = new Card;//convert it to a 'collection' instead of an array to rid the
        $success = false;
        $totalEnergy = 0;

        //$cardsToDelete = Card::find($id);
        if (!$userAccount) {
            return $this->response->errorNotFound('User Not Found');
        } else {
            //$this->response = "test"; //json_encode($card);
            $cards_to_delete = json_decode($request->getContent(), true);

            for ($i = 0; $i < count($cards_to_delete); $i++) {
                //1. It is iterating correctly
                $this->$card[$i] = Card::where('id', $cards_to_delete[$i]['id'])->get();//$i might throw error here

                $totalEnergy = $totalEnergy + $this->$card[$i][0]->Energy_Value;
                if($cards_to_delete[$i]->delete()){
                    $this->$success = true;
                }
                else{
                    $this->$success = false;
                }
                //calculate all energy of the cards
            }


            if ($this->$success == true) {

                $userAccount->Energy = $userAccount->Energy + ($totalEnergy * .2);
                $this->response = "Universes Destroyed. Refunded Energy: " + ($totalEnergy * .2);
                //refund user ID $totalEnergy * .2

            }else{
                $this->response->errorInternalError('Could not delete Universe(s)');
            }



        }
        return $this->response;
    }
}
