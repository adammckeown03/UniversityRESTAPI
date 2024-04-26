import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Degrees = () => {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/')
      .then(response => response.json())
      .then(data => {
        const filteredDegrees = data.filter(degree => degree.full_name !== "string");
        setDegrees(filteredDegrees);
      });
  }, []);

  return (
    <div>
      <h1>All Degrees</h1>
      <Link to="/new-degree">Create New Degree</Link>
      {degrees.map(degree => (
        <div key={degree.shortcode}>
          <h2><Link to={`/degrees/${degree.shortcode}`}>{degree.full_name}</Link></h2>
          <p>Shortcode: {degree.shortcode}</p>
        </div>
      ))}
    </div>
  );
};

export default Degrees;
