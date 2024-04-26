import React, { useState } from 'react';

const NewDegree = () => {
  const [degree, setDegree] = useState({ full_name: '', shortcode: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDegree(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/api/degree/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(degree),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create degree');
      }
    })
    .catch(error => console.error('Error creating degree:', error));
  };

  return (
    <div>
      <h2>Create New Degree</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="full_name" value={degree.full_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Shortcode:
          <input type="text" name="shortcode" value={degree.shortcode} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Degree</button>
      </form>
    </div>
  );
}

export default NewDegree;
