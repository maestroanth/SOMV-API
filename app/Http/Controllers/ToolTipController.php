<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Tooltip;
use EllipseSynergie\ApiResponse\Contracts\Response;
use App\Transformer\UserAccountTransformer;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class ToolTipController extends Controller
{
    protected $response;


    public function __construct(Response $response)
    {
        $this->response = $response;
    }

    public function getAllToolTipData()
    {
        $this->response = Tooltip::all();
        return $this->response;
    }

    public function getToolTipData($category)
    {
        $this->response = Tooltip::where('category', $category);
       return $this->response;
    }
}
