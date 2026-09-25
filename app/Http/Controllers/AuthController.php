<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Invalid username or password.'
            ], 401);
        }

        if (!password_verify($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid username or password.'
            ], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'user_id' => $user->user_id,
                'username' => $user->username,
                'privilege_level' => $user->privilege_level,
            ]
        ]);
    }
}
