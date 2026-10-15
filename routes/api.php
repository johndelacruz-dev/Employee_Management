<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;

Route::middleware(['web', 'auth:web', 'permission:view employees'])->get('/employees', [EmployeeController::class, 'index']);

Route::middleware(['web', 'auth:web', 'permission:add employees'])->post('/employees', [EmployeeController::class, 'store']);

Route::middleware(['web', 'auth:web', 'permission:edit employees'])->put('/employees/{employee}', [EmployeeController::class, 'update']);

Route::middleware(['web', 'auth:web', 'permission:delete employees'])->delete('/employees/{employee}', [EmployeeController::class, 'destroy']);

Route::middleware(['web', 'auth:web', 'permission:view employees'])->get('/employee-statistics', [EmployeeController::class, 'statistics']);

Route::middleware(['web', 'auth:web', 'permission:add employees'])->group(function () {
    Route::get('/departments', [EmployeeController::class, 'departments']);
    Route::get('/job-titles', [EmployeeController::class, 'jobTitles']);
    Route::get('/job-positions', [EmployeeController::class, 'jobPositions']);
    Route::get('/employee-statuses', [EmployeeController::class, 'employeeStatuses']);
    Route::get('/genders', [EmployeeController::class, 'genders']);
});

Route::middleware(['web', 'auth:web', 'permission:edit employees'])->get('/employees/{employee}', [EmployeeController::class, 'show']);