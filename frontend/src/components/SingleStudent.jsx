import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function SingleStudent() {
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/student/${params.student_id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
      })
      .catch((err) => console.log(err));

    fetch(`http://127.0.0.1:8000/api/grade/?student=${params.student_id}`)
      .then((response) => response.json())
      .then((data) => {
        setGrades(data);
      })
      .catch((err) => console.log(err));
  }, [params.student_id]);

  const displayGrades = () => {
    return grades.map((grade) => (
      <div key={grade.id}>
        <p>Module: {grade.module.split("/").slice(-2, -1)}</p>
        <p>CA: {grade.ca_mark}</p>
        <p>Exam: {grade.exam_mark}</p>
        <p>Total Grade: {grade.total_grade}</p>
        <p>Cohort: {grade.cohort.split("/").slice(-2, -1)}</p>
        <hr />
      </div>
    ));
  };

  return (
    <div>
      <div>
        <h1>Student ID: {student ? student.student_id : "Loading..."}</h1>
      </div>
      <div>
        <div>
          <h2>Student Details:</h2>
          <p>Name: {student ? `${student.first_name} ${student.last_name}` : ""}</p>
        </div>
      </div>
      <br />
      <div>
        {displayGrades()}
      </div>
    </div>
  );
}

export default SingleStudent;
