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
        $this->response = Race::where('id', $id)->first();
        return $this->response;
    }
}
