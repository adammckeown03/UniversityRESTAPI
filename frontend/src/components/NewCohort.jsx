import React, { useState, useEffect } from "react";

function PostData(data) {
	fetch("http://127.0.0.1:8000/api/cohort/", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
		.then(() => {
			alert("Success!");
		})
		.catch((err) => {
			console.log(err);
		});
}

function NewCohort() {
	const [id, setId] = useState("");
	const [year, setYear] = useState("");
	const [degree, setDegree] = useState("");
	const [name, setName] = useState("");
	const [degreeList, setDegreeList] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
		PostData({
			"id": id,
			"year": year,
			"degree": degree,
			"name": name,
		});
	}

	useEffect(() => {
		fetch(`http://127.0.0.1:8000/api/degree/`)
			.then(response => response.json())
			.then(data => {
				setDegreeList(data);
			})
			.catch(err => console.log(err))
	}, []);

	const displayDegreeList = () => {
		return degreeList.map(elem =>
			<option
				value={"http://127.0.0.1:8000/api/degree/" + elem.shortcode + "/"}
				key={"http://127.0.0.1:8000/api/degree/" + elem.shortcode + "/"}
			>{elem.full_name}</option>
		);
	}

	const handleSelectChange = (e) => {
		setDegree(e.target.value);
	};

	return (
		<div>
			<h1>Create Cohort</h1>
			<div>
				<form onSubmit={handleSubmit}>
					<div>
						<label>ID:</label><br />
						<input
							type="text"
							value={id}
							onChange={(e) => setId(e.target.value)}
							placeholder="COMSCI" required />
					</div>
					<div>
						<label>Year:</label><br />
						<input
							type="number"
							value={year}
							onChange={(e) => setYear(e.target.value)}
							placeholder="between 1-4" required />
					</div>
					<div>
						<label>Name:</label><br />
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="2nd Year Com Sci" required />
					</div>
					<div>
						<label>Degree:</label><br />
						<select
							onChange={handleSelectChange}
							value={degree}
							required
						>
							<option value="" disabled>Select Degree</option>
							{displayDegreeList()}
						</select>
					</div>
					<button type="submit">
						Create
					</button>
				</form>
			</div>
		</div>
	)
}

export default NewCohort;
