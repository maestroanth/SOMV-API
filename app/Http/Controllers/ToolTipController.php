<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Tooltip;
use EllipseSynergie\ApiResponse\Contracts\Response;

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
        $category = parse_int($category);
        $this->response = Tooltip::where('category', $category);
       return $this->response;
    }
}
