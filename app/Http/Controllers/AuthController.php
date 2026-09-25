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

        $request->session()->put('user_id', $user->user_id);
        $request->session()->put('username', $user->username);
        $request->session()->put('privilege_level', $user->privilege_level);

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'user_id' => $user->user_id,
                'username' => $user->username,
                'privilege_level' => $user->privilege_level,
            ]
        ]);
    }


    public function me(Request $request)
    {
        if (!$request->session()->has('user_id')) {
            return response()->json([
                'authenticated' => false
            ], 401);
        }

        return response()->json([
            'authenticated' => true,
            'user' => [
                'user_id' => $request->session()->get('user_id'),
                'username' => $request->session()->get('username'),
                'privilege_level' => $request->session()->get('privilege_level'),
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout successful'
        ]);
    }
}
