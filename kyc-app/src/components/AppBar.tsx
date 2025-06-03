import React from 'react';
import './AppBar.css';
import logo from './Barclays_logo.png'; // ✅ Fix the path

const AppBar = () => (
    <div className="app-bar">
        <img src={logo} alt="Barclays" className="app-bar-logo" />
        <h1 className="app-bar-title">Automated KYC Portal</h1>
    </div>
);

export default AppBar;
