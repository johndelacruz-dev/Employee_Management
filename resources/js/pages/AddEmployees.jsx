function AddEmployee() {
    const testAddEmployee = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                first_name: "Test",
                last_name: "Employee",
                contact: "09123456789",
                email: "test@example.com",
                address: "Test Address",
                salary: 25000,
                hire_date: "2026-09-28",
                job_title_id: 1,
                job_position_id: 1,
                employee_status_id: 1,
                department_id: 1,
                gender_id: 1
            })
        });

        const data = await response.json();

        console.log(response.status);
        console.log(data);
    };

    const testEditEmployee = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/employees/444", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                first_name: "Updated",
                last_name: "Employee",
                contact: "09123456789",
                email: "updated@example.com",
                address: "Updated Address",
                salary: 30000,
                hire_date: "2026-09-28",
                job_title_id: 1,
                job_position_id: 1,
                employee_status_id: 1,
                department_id: 1,
                gender_id: 1
            })
        });

        const data = await response.json();

        console.log(response.status);
        console.log(data);
    };

    const testDeleteEmployee = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/employees/444", {
            method: "DELETE",
            credentials: "include"
        });

        const data = await response.json();

        console.log(response.status);
        console.log(data);
    };

    return (
        <div>
            <button onClick={testAddEmployee}>
                Test Add Employee
            </button>

            <button onClick={testEditEmployee}>
                Test Edit Employee
            </button>

            <button onClick={testDeleteEmployee}>
                Test Delete Employee
            </button>
        </div>
    );
}

export default AddEmployee;