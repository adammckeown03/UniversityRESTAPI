import React, { useState, useEffect } from "react";

function postDataToApi(data) {
    fetch("http://127.0.0.1:8000/api/grade/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(() => {
        alert("Success!");
    })
    .catch(err => {
        console.log(err);
    });
}

function SetGrade() {
    const [module, setModule] = useState("");
    const [exam_mark, setExamMark] = useState("");
    const [ca_mark, setCaMark] = useState("");
    const [cohort, setCohort] = useState("");
    const [student, setStudent] = useState("");
    const [studentList, setStudentList] = useState([]);
    const [cohortList, setCohortList] = useState([]);
    const [moduleList, setModuleList] = useState([]);

    const displayModuleList = () => {
        return moduleList.map(elem => (
            <option
                value={"http://127.0.0.1:8000/api/module/" + elem.code + "/"}
                key={"http://127.0.0.1:8000/api/module/" + elem.code + "/"}
            >
                {elem.full_name}
            </option>
        ));
    };

    const displayCohortList = () => {
        return cohortList.map(elem => (
            <option
                value={"http://127.0.0.1:8000/api/cohort/" + elem.id + "/"}
                key={"http://127.0.0.1:8000/api/cohort/" + elem.id + "/"}
            >
                {elem.name}
            </option>
        ));
    };

    const displayStudentList = () => {
        return studentList.map(elem => (
            <option
                value={"http://127.0.0.1:8000/api/student/" + elem.student_id + "/"}
                key={"http://127.0.0.1:8000/api/student/" + elem.student_id + "/"}
            >
                {elem.first_name} {elem.last_name}
            </option>
        ));
    };

    const handleSubmit = event => {
        event.preventDefault();
        postDataToApi({
            module: module,
            ca_mark: ca_mark,
            exam_mark: exam_mark,
            cohort: cohort,
            student: student
        });
    };

    const handleSelectChangeStudent = e => {
        setStudent(e.target.value);
    };

    const handleSelectChangeCohort = e => {
        setCohort(e.target.value);
    };

    const handleSelectChangeModule = e => {
        setModule(e.target.value);
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/`)
            .then(response => response.json())
            .then(data => {
                setModuleList(data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/`)
            .then(response => response.json())
            .then(data => {
                setStudentList(data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/`)
            .then(response => response.json())
            .then(data => {
                setCohortList(data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Set Student Grade</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Module:</label>
                        <select
                            onChange={handleSelectChangeModule}
                            value={module}
                            required
                        >
                            {displayModuleList()}
                        </select>
                    </div>
                    <div>
                        <label>CA:</label>
                        <input
                            type="number"
                            value={ca_mark}
                            onChange={e => setCaMark(e.target.value)}
                            placeholder="0-100"
                            required
                        />
                    </div>
                    <div>
                        <label>Exam:</label>
                        <input
                            type="number"
                            value={exam_mark}
                            onChange={e => setExamMark(e.target.value)}
                            placeholder="0-100"
                            required
                        />
                    </div>
                    <div>
                        <label>Cohort:</label>
                        <select
                            onChange={handleSelectChangeCohort}
                            value={cohort}
                            required
                        >
                            {displayCohortList()}
                        </select>
                    </div>
                    <div>
                        <label>Student:</label>
                        <select
                            onChange={handleSelectChangeStudent}
                            value={student}
                            required
                        >
                            {displayStudentList()}
                        </select>
                    </div>
                    <button type="submit">
                        Add Grade
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SetGrade;
