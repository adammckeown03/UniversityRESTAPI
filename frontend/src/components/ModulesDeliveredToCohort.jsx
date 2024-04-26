import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ModulesDeliveredToCohort() {
  const [modules, setModules] = useState([]);
  const { cohortCode } = useParams();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch modules');
        }
        const data = await response.json();
        setModules(data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, [cohortCode]);

  return (
    <div>
      <h2>Modules Delivered to Cohort {cohortCode}</h2>
      <ul>
        {modules.length > 0 ? (
          modules.map(module => (
            <li key={module.code}>
              <Link to={`/modules/${module.code}`}>{module.full_name}</Link>
            </li>
          ))
        ) : (
          <li>No modules found.</li>
        )}
      </ul>
    </div>
  );
}

export default ModulesDeliveredToCohort;
