import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function SingleModule() {
  const [module, setModule] = useState(null);
  const [cohorts, setCohorts] = useState([]);
  const { moduleCode } = useParams();

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/module/${moduleCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch module');
        }
        const data = await response.json();
        setModule(data);
        const cohortCodes = data.delivered_to.map(cohortUrl => cohortUrl.split('/').slice(-2, -1)[0]);
        const cohortPromises = cohortCodes.map(cohortCode =>
          fetch(`http://127.0.0.1:8000/api/cohort/${cohortCode}`)
            .then(response => response.json())
        );
        const cohortData = await Promise.all(cohortPromises);
        setCohorts(cohortData);
      } catch (error) {
        console.error('Error fetching module:', error);
      }
    };

    fetchModule();
  }, [moduleCode]);

  return (
    <div>
      <div>
        <h3>{module ? module.code : "Loading..."}</h3>
      </div>
      <div>
        <p>Module Name: {module ? module.full_name : ""}</p>
        <p>CA Split: {module ? module.ca_split : ""}</p>
        <p>Module For:</p>
        <ul>
          {cohorts.length > 0 ? (
            cohorts.map(cohort => (
              <li key={cohort.id}>
                <Link to={`/modules-delivered-to-cohort/${cohort.id}`}>{cohort.name}</Link>
              </li>
            ))
          ) : (
            <li>No cohorts found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SingleModule;
