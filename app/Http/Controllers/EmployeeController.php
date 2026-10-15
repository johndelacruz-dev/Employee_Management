<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    public function statistics()
    {
        $totalEmployees = Employee::count();

        $statusCounts = Employee::query()
            ->join(
                'employee_status_table',
                'employee_table.employee_status_id',
                '=',
                'employee_status_table.employee_status_id'
            )
            ->selectRaw('
                employee_status_table.employee_status_name as status,
                COUNT(*) as count
            ')
            ->groupBy(
                'employee_status_table.employee_status_id',
                'employee_status_table.employee_status_name'
            )
            ->get();

        $statuses = $statusCounts->map(function ($status) use ($totalEmployees) {
            return [
                'status' => $status->status,
                'count' => $status->count,
                'percentage' => $totalEmployees > 0
                    ? round(($status->count / $totalEmployees) * 100, 2)
                    : 0,
            ];
        });

        return response()->json([
            'total_employees' => $totalEmployees,
            'statuses' => $statuses,
        ]);
    }

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

    
    public function index(Request $request)
    {
        $search = trim($request->query('search', ''));

        $query = DB::table('employee_table')
            ->join(
                'job_title_table',
                'employee_table.job_title_id',
                '=',
                'job_title_table.job_title_id'
            )
            ->join(
                'job_position_table',
                'employee_table.job_position_id',
                '=',
                'job_position_table.job_position_id'
            )
            ->join(
                'employee_status_table',
                'employee_table.employee_status_id',
                '=',
                'employee_status_table.employee_status_id'
            )
            ->join(
                'department_table',
                'employee_table.department_id',
                '=',
                'department_table.department_id'
            )
            ->join(
                'gender_table',
                'employee_table.gender_id',
                '=',
                'gender_table.gender_id'
            )
            ->select(
                'employee_table.employee_id',
                'employee_table.first_name',
                'employee_table.last_name',
                'employee_table.contact',
                'employee_table.email',
                'employee_table.address',
                'employee_table.salary',
                'employee_table.hire_date',
                'employee_table.job_title_id',
                'job_title_table.job_title_name',
                'employee_table.job_position_id',
                'job_position_table.job_position_name',
                'employee_table.employee_status_id',
                'employee_status_table.employee_status_name',
                'employee_table.department_id',
                'department_table.department_name',
                'employee_table.gender_id',
                'gender_table.gender_name'
            );

        if ($search !== '') {
            $query->whereRaw(
                "CONCAT(employee_table.first_name, ' ', employee_table.last_name) LIKE ?",
                ['%' . $search . '%']
            );
        }

        $employees = $query->get();

        return response()->json($employees);
    }

    public function departments()
    {
        return response()->json(
            DB::table('department_table')
                ->select('department_id', 'department_name')
                ->orderBy('department_name')
                ->get()
        );
    }

    public function jobTitles(Request $request)
    {
        $request->validate([
            'department_id' => 'required|integer',
        ]);

        return response()->json(
            DB::table('job_title_table')
                ->select('job_title_id', 'job_title_name')
                ->where('department_id', $request->query('department_id'))
                ->orderBy('job_title_name')
                ->get()
        );
    }

    public function jobPositions(Request $request)
    {
        $request->validate([
            'department_id' => 'required|integer',
        ]);

        return response()->json(
            DB::table('job_position_table')
                ->select('job_position_id', 'job_position_name')
                ->where('department_id', $request->query('department_id'))
                ->orderBy('job_position_name')
                ->get()
        );
    }

    public function employeeStatuses()
    {
        return response()->json(
            DB::table('employee_status_table')
                ->select('employee_status_id', 'employee_status_name')
                ->orderBy('employee_status_id')
                ->get()
        );
    }

    public function genders()
    {
        return response()->json(
            DB::table('gender_table')
                ->select('gender_id', 'gender_name')
                ->orderBy('gender_id')
                ->get()
        );
    }
}
