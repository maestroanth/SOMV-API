<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Card;
use App\Universe;
use App\Move;
use App\Keyword;
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
        $this->response = json_encode($this->response);
        return $this->response;
    }

    public function getAllMoves()
    {
        $this->response = Move::all();
        return $this->response;
    }

    public function getAllKeywords()
    {
        $this->response = Keyword::all();
        $this->response = json_encode($this->response);
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

    public function updateCardNameDescription(Request $request, $id)
    {

        $cardToUpdate = Card::find($id);
        if(!$cardToUpdate)
        {
            return $this->response->errorInternalError('Could not find the card ID.');
        }
        else{
            try {

                //Step 1. Generate the Card (This will be after user modifications)
                $cardToUpdate->name = $request->input('name');
                $cardToUpdate->description = $request->input('description');
                if ($cardToUpdate->save()) {//this line is important because the ->save is what actually saves it into the DB even though it is in an 'if' statement

                    return $this->response = json_encode($cardToUpdate);//remember to do json_encode from now on
                } else {
                    return $this->response->errorInternalError('Could not update Universe card.');
                }
            }
            catch (Exception $e){
                return $this->response->errorInternalError('Could not update Universe card.');
            }

        }

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
                $newCard->Move1_Buff_Tally = $request->input('Move1_Buff_Tally');
                $newCard->FK_Move_2 = $request->input('FK_Move_2');
                $newCard->Move2_Buff_Tally = $request->input('Move2_Buff_Tally');
                $newCard->FK_Move_3 = $request->input('FK_Move_3');
                $newCard->Move3_Buff_Tally = $request->input('Move3_Buff_Tally');
                $newCard->FK_Move_4 = $request->input('FK_Move_4');
                $newCard->Move4_Buff_Tally = $request->input('Move4_Buff_Tally');
                $newCard->FK_Move_Ultimate = $request->input('FK_Move_Ultimate');
                $newCard->MoveUltimate_Buff_Tally = $request->input('MoveUltimate_Buff_Tally');

                $newCard->Birth_URL = $request->input('Birth_URL');
                $newCard->Energy_Value = $request->input('Energy_Value');

                $newCard->Created_By = $request->input('Created_By');

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
         *What's working as of 11-20-2017:
         * 1. Deletes multiple cards at once, and the correct cards too
         *
         * 2. Tallies up the correct energy to be refunded
         *
         * 3. Refunds Energy To User Account
         *
         * What's not working as of 11-20-2017
         *
         * 1. See the double asterisk I marked '**'
         *
         * 2. Front-end still needs to auto-refresh after delete button is clicked
         *
         */
        //Get the user
        $userAccount = User::find($id);
        $card = new Card;//convert it to a 'collection' instead of an array to rid the
        $success = false;
        $totalEnergy = 0;

        //$cardsToDelete = Card::find($id);
        if (!$userAccount) {
            $this->response->errorNotFound('User Not Found');
        } else {
            //$this->response = "test"; //json_encode($card);
            $cards_to_delete = json_decode($request->getContent(), true);



                $this->$card = Card::where('id', $cards_to_delete['id'])->get();//$i might throw error here
                $totalEnergy = $totalEnergy + $this->$card[0]->Energy_Value;
                $deleteCard = Card::find($cards_to_delete['id']);
                if ($deleteCard->delete()) {
                    $success = true;
                } else {
                    $success = false;
                }


            if ($success == true) {

                $userAccount['Energy'] = $userAccount['Energy'] + ($totalEnergy * .2);
                if($userAccount->save()) {
                    $energyRefunded= ($totalEnergy * .2);
                    $nameString = $userAccount['sagename'];
                    //$this->response = 413;
                    $this->response->setStatusCode(200);
                    $this->response = $energyRefunded;//**I want to return messages, but the front-end doesn't detect as a 'success' when I do and keeps sending requests...odd

                }
                else{
                    $this->response->errorInternalError('Could not update user energy.');
                }
                //refund user ID $totalEnergy * .2
            }else{
                 $this->response->errorInternalError('Could not delete Universe(s)');
            }



        }

        return $this->response;
    }
}
