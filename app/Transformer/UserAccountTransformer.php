<?php
/**
 * Created by PhpStorm.
 * User: Anthony
 * Date: 8/10/2017
 * Time: 1:47 PM
 */
namespace App\Transformer;
use League\Fractal\TransformerAbstract;

class UserAccountTransformer extends TransformerAbstract
{
    public function transform($userAccount) {
        return [
            'id' => $userAccount->id,
            'sagename' => $userAccount->sagename,
            'realname' => $userAccount->realname,
            'email' => $userAccount->email,
            'password' => $userAccount->password,
        ];
    }
}