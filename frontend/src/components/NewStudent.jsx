import React, { useState, useEffect } from "react";

function postDataToApi(data) {
    fetch("http://127.0.0.1:8000/api/student/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to create student");
        }
        return response.json();
    })
    .then(() => {
        alert("Student created successfully!");
    })
    .catch((err) => {
        console.error("Error creating student:", err);
    });
}

function NewStudent() {
    const [student_id, setStudentId] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [cohort, setCohort] = useState("");

    const [cohortList, setCohortList] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/`)
            .then(response => response.json())
            .then(data => {
                setCohortList(data);
            })
            .catch(err => {
                console.error("Error fetching cohorts:", err);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        postDataToApi({
            "student_id": student_id,
            "first_name": first_name,
            "last_name": last_name,
            "cohort": cohort,
        });
    };

    const handleSelectChange = (e) => {
        setCohort(e.target.value);
    };

    const renderCohortOptions = () => {
        return cohortList.map(cohort => (
            <option
                value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}
                key={`cohort_${cohort.id}`}
            >
                {cohort.name}
            </option>
        ));
    };

    return (
        <div>
            <h1>Create Student</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>ID:</label>
                        <input
                            type="text"
                            value={student_id}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="22462626"
                            required
                        />
                    </div>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            required
                        />
                    </div>
                    <div>
                        <label>Cohort:</label>
                        <select
                            onChange={handleSelectChange}
                            value={cohort}
                            required
                        >
                            {renderCohortOptions()}
                        </select>
                    </div>
                    <button type="submit">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewStudent;
