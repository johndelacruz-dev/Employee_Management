<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

Route::middleware(['web', 'auth:web', 'permission:view employees'])->get('/employees', [EmployeeController::class, 'index']);

Route::middleware(['web', 'auth:web', 'permission:add employees'])->post('/employees', [EmployeeController::class, 'store']);

Route::middleware(['web', 'auth:web', 'permission:edit employees'])->put('/employees/{employee}', [EmployeeController::class, 'update']);

Route::middleware(['web', 'auth:web', 'permission:delete employees'])->delete('/employees/{employee}', [EmployeeController::class, 'destroy']);

Route::middleware(['web', 'auth:web', 'permission:view employees'])->get('/employee-filter-options', [EmployeeController::class, 'filterOptions']);

Route::middleware(['web', 'auth:web', 'permission:view employees'])->get('/employee-statistics', [EmployeeController::class, 'statistics']);

Route::middleware(['web', 'auth:web', 'permission:add employees'])->group(function () {
    Route::get('/departments', [EmployeeController::class, 'departments']);
    Route::get('/job-titles', [EmployeeController::class, 'jobTitles']);
    Route::get('/job-positions', [EmployeeController::class, 'jobPositions']);
    Route::get('/employee-statuses', [EmployeeController::class, 'employeeStatuses']);
    Route::get('/genders', [EmployeeController::class, 'genders']);
});

Route::middleware(['web', 'auth:web', 'permission:edit employees'])->get('/employees/{employee}', [EmployeeController::class, 'show']);

Route::middleware([
    'web',
    'auth:web'
])->put('/profile', function (Request $request) {

    $user = $request->user();

    $validated = $request->validate([

        'username' => [
            'required',
            'string',
            'max:250',
            'unique:user_table,username,' .
                $user->user_id .
                ',user_id',
        ],

        'current_password' => [
            'nullable',
            'string',
        ],

        'password' => [
            'nullable',
            'string',
            'min:8',
            'confirmed',
        ],

    ]);

    if (!empty($validated['password'])) {

        if (empty($validated['current_password'])) {

            return response()->json([
                'message' =>
                    'Please enter your current password.'
            ], 422);

        }

        if (!Hash::check(
            $validated['current_password'],
            $user->password
        )) {

            return response()->json([
                'message' =>
                    'The current password is incorrect.'
            ], 422);

        }

    }

    $user->username =
        $validated['username'];

    if (!empty($validated['password'])) {

        $user->password =
            $validated['password'];

    }

    $user->save();

    return response()->json([
        'message' =>
            'Your account has been updated successfully.',

        'user' =>
            $user->fresh(),
    ]);
});