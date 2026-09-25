<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/login');
});

Route::get("/login", function() {
    return view("app");
});

Route::get("/landing", function() {
    return view("app");
});