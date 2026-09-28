<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return response()->json([
            'message' => 'Employee deleted successfully.'
        ]);
    }

    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:250',
            'last_name' => 'required|string|max:250',
            'contact' => 'required|string|max:50',
            'email' => 'required|email|max:250',
            'address' => 'required|string|max:250',
            'salary' => 'required|integer',
            'hire_date' => 'required|date',
            'job_title_id' => 'required|integer',
            'job_position_id' => 'required|integer',
            'employee_status_id' => 'required|integer',
            'department_id' => 'required|integer',
            'gender_id' => 'required|integer',
        ]);

        $employee->update($validated);

        return response()->json([
            'message' => 'Employee updated successfully.',
            'employee' => $employee
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:250',
            'last_name' => 'required|string|max:250',
            'contact' => 'required|string|max:50',
            'email' => 'required|email|max:250',
            'address' => 'required|string|max:250',
            'salary' => 'required|integer',
            'hire_date' => 'required|date',
            'job_title_id' => 'required|integer',
            'job_position_id' => 'required|integer',
            'employee_status_id' => 'required|integer',
            'department_id' => 'required|integer',
            'gender_id' => 'required|integer',
        ]);

        $employee = Employee::create($validated);

        return response()->json([
            'message' => 'Employee added successfully.',
            'employee' => $employee
        ], 201);
    }

    public function index()
    {
        $employees = Employee::all();

        return response()->json($employees);
    }
}
