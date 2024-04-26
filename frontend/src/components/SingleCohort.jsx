import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function SingleCohort() {
  const [cohort, setCohort] = useState(null);
  const [students, setStudents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchCohort = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/cohort/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cohort');
        }
        const data = await response.json();
        setCohort(data);
      } catch (error) {
        console.error('Error fetching cohort:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/student/");
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        const filteredStudents = data.filter(student => {
          const cohortIdFromURL = student.cohort.split('/').slice(-2, -1)[0];
          return cohortIdFromURL === id;
        });
        setStudents(filteredStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    

    fetchCohort();
    fetchStudents();
  }, [id]);

  return (
    <div>
      <div>
        <h3>{cohort ? cohort.id : "Loading..."}</h3>
      </div>
      <div>
        {students.length > 0 ? (
          students.map(student => (
            <div key={student.student_id}>
              <p>ID: {student.student_id}</p>
              <p>Name: {student.first_name} {student.last_name}</p>
              <p>Email: {student.email}</p>
              <Link to={`/students/${student.student_id}`}>
                <button>View Student</button>
              </Link>
              <hr />
            </div>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
}

export default SingleCohort;
