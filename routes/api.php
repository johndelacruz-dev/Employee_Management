<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware("web")->post("/login", [AuthController::class, "login"]);

Route::middleware("web")->get("/me", [AuthController::class, "me"]);