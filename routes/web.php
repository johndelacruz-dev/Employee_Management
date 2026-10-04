<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/landing');
    }

    return redirect('/login');
});

Route::get('/login', function () {
    return Inertia::render('Login');
})->middleware('guest')->name('login');

Route::middleware('auth')->group(function () {

    Route::get('/landing', function () {
        return Inertia::render('Landing');
    });

    Route::get('/employees', function () {
        return Inertia::render('ViewEmployees');
    });

    Route::get('/employees/add', function () {
        return Inertia::render('AddEmployees');
    });

});