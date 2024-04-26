import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Degrees from './components/Degrees.jsx';
import SingleDegree from './components/SingleDegree.jsx';
import NewDegree from './components/NewDegree.jsx';
import Cohorts from './components/Cohorts.jsx';
import SingleCohort from './components/SingleCohort.jsx';
import NewCohort from './components/NewCohort.jsx';
import Modules from './components/Modules.jsx';
import SingleModule from './components/SingleModule.jsx';
import ModulesDeliveredToCohort from './components/ModulesDeliveredToCohort.jsx';
import NewModule from './components/NewModule.jsx';
import SingleStudent from './components/SingleStudent.jsx';
import NewStudent from './components/NewStudent.jsx';
import SetGrades from './components/SetGrades.jsx';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/degrees" element={<Degrees />} />
          <Route path="/degrees/:id" element={<SingleDegree />} />
          <Route path="/new-degree" element={<NewDegree />} />
          <Route path="/cohorts" element={<Cohorts />} />
          <Route path="/cohorts/:id" element={<SingleCohort />} />
          <Route path="/new-cohort" element={<NewCohort />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:moduleCode" element={<SingleModule />} />
          <Route path="/new-module" element={<NewModule />} />
          <Route path="/modules-delivered-to-cohort/:cohortCode" element={<ModulesDeliveredToCohort />} />
          <Route path="/students/:student_id" element={<SingleStudent />} />
          <Route path="/new-student" element={<NewStudent />} />
          <Route path="/set-grades" element={<SetGrades />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;