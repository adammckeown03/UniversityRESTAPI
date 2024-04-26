import React, { useState, useEffect } from "react";

function postDataToApi(data) {
    fetch("http://127.0.0.1:8000/api/module/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to create module");
        }
        return response.json();
    })
    .catch((err) => {
        console.error("Error creating module:", err);
    });
}

function NewModule() {
    const [codeValue, setCodeValue] = useState("");
    const [fullNameValue, setFullNameValue] = useState("");
    const [selectedCohorts, setSelectedCohorts] = useState([]);
    const [caSplitValue, setCaSplitValue] = useState(0);
    const [cohortsList, setCohortsList] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/`)
            .then(response => response.json())
            .then(data => {
                setCohortsList(data);
            })
            .catch(err => {
                console.error("Error fetching cohorts:", err);
            });
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        postDataToApi({
            "code": codeValue,
            "full_name": fullNameValue,
            "delivered_to": selectedCohorts,
            "ca_split": parseInt(caSplitValue),
        });
    };

    const handleSelectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedCohorts(selectedOptions);
    };

    const renderCohortOptions = () => {
        return cohortsList.map(cohort => (
            <option
                value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}
                key={`cohort_${cohort.id}`}
            >
                {cohort.name}
            </option>
        ));
    };

    return (
        <div>
            <h1>Create a New Module</h1>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Code:</label>
                        <input
                            type="text"
                            value={codeValue}
                            onChange={(e) => setCodeValue(e.target.value)}
                            placeholder="Enter module code"
                        />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={fullNameValue}
                            onChange={(e) => setFullNameValue(e.target.value)}
                            placeholder="Enter module name"
                        />
                    </div>
                    <div>
                        <label>Cohorts:</label>
                        <select
                            multiple
                            onChange={handleSelectChange}
                            value={selectedCohorts}
                        >
                            {renderCohortOptions()}
                        </select>
                    </div>
                    <div>
                        <label>CA Split:</label>
                        <input
                            type="number"
                            value={caSplitValue}
                            onChange={(e) => setCaSplitValue(e.target.value)}
                            placeholder="Enter CA split percentage"
                        />
                    </div>
                    <button type="submit">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewModule;
