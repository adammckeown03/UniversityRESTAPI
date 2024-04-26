import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

function Module()
{
    const [modules, setModules] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/module/")
        .then(response => response.json())
        .then(data => {
            setModules(data);
        })
        .catch(err => console.log(err))
    }, []);

    const displayModules = () => {
        return modules.map(module => (
            <li key={module.code}>
                <Link to={`/modules/${module.code}`}>{module.full_name}</Link>
            </li>
        ));
    }

    return (
        <div>
            <h2>All Modules</h2>
            <Link to="/new-module">Create New Module</Link>
            <ul>
                {displayModules()}
            </ul>
        </div>
    );
}

export default Module;
