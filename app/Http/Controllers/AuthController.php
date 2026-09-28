<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid username or password.'
            ], 401);
        }

        $request->session()->regenerate();

        $user = Auth::user();

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
        if (!$request->user()) {
            return response()->json([
                'authenticated' => false
            ], 401);
        }

        $user = $request->user();

        return response()->json([
            'authenticated' => true,
            'user' => [
                'user_id' => $user->user_id,
                'username' => $user->username,
                'privilege_level' => $user->privilege_level,
            ]
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout successful'
        ]);
    }
}