import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cohorts = () => {
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cohort/')
      .then(response => response.json())
      .then(data => setCohorts(data))
      .catch(error => console.error('Error fetching cohorts:', error));
  }, []);

  return (
    <div>
      <h2>All Cohorts</h2>
      <Link to="/new-cohort">Create New Cohort</Link>
      <ul>
        {cohorts.map(cohort => (
          <li key={cohort.id}>
            <Link to={`/cohorts/${cohort.id}`}>{cohort.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cohorts;
