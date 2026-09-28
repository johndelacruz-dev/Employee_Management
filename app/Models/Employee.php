<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table = 'employee_table';

    protected $primaryKey = 'employee_id';

    public $timestamps = false;

    protected $fillable = [
        'first_name',
        'last_name',
        'contact',
        'email',
        'address',
        'salary',
        'hire_date',
        'job_title_id',
        'job_position_id',
        'employee_status_id',
        'department_id',
        'gender_id',
    ];
}
