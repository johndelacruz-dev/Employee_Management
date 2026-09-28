<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;

Route::middleware("web")->post("/login", [AuthController::class, "login"]);

Route::middleware("web")->get("/me", [AuthController::class, "me"]);

Route::middleware("web")->post("/logout", [AuthController::class, "logout"]);

Route::middleware(['web', 'auth:web', 'permission:view employees'])->get('/employees', [EmployeeController::class, 'index']);

Route::middleware(['web', 'auth:web', 'permission:add employees'])->post('/employees', [EmployeeController::class, 'store']);