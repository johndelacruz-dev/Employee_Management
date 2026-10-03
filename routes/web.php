<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::get('/landing', function () {
    return Inertia::render('Landing');
});

Route::get('/employees', function () {
    return Inertia::render('ViewEmployees');
});

Route::get('/employees/add', function () {
    return Inertia::render('AddEmployees');
});