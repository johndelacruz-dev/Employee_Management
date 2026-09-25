<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table = 'user_table';

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'username',
        'password',
        'privilege_level',
    ];

    protected $hidden = [
        'password',
    ];
}
