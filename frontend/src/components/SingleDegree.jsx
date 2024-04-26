import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function SingleDegree() {
    const [degree, setDegree] = useState({});
    const [cohorts, setCohorts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchDegree = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/degree/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch degree');
                }
                const data = await response.json();
                setDegree(data);
            } catch (error) {
                console.error('Error fetching degree:', error);
            }
        };

        const fetchCohorts = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/cohort/");
                if (!response.ok) {
                    throw new Error('Failed to fetch cohorts');
                }
                const data = await response.json();
                // Filter cohorts for the current degree
                const filteredCohorts = data.filter(cohort => cohort.id.includes(id));
                setCohorts(filteredCohorts);
            } catch (error) {
                console.error('Error fetching cohorts:', error);
            }
        };

        fetchDegree();
        fetchCohorts();
    }, [id]);

    return (
        <div>
            <div>
                <h3>[{degree.shortcode}] {degree.full_name}</h3>
            </div>
            <div>
                <ul> {/* Wrap the cohorts list in a <ul> element */}
                    {cohorts.map(cohort => (
                        <li key={cohort.id}> {/* Place <li> element here */}
                            <Link to={`/modules-delivered-to-cohort/${cohort.id}`}>{cohort.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SingleDegree;
