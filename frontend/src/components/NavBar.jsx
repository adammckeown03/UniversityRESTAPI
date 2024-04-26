// NavBar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/degrees" activeClassName="active">Degrees</NavLink>
        </li>
        <li>
          <NavLink to="/cohorts" activeClassName="active">Cohorts</NavLink>
        </li>
        <li>
          <NavLink to="/modules" activeClassName="active">Modules</NavLink>
        </li>
        <li>
          <NavLink to="/new-student" activeClassName="active">New Student</NavLink>
        </li>
        <li>
          <NavLink to="/set-grades" activeClassName="active">Set Grades</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
