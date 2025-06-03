/// src/components/AppBar.tsx
import React from 'react';
import './AppBar.css';

const AppBar = () => (
    <div className="app-bar">
        <img src="/barclays_logo.png" alt="Barclays" className="app-bar-logo" />
        <h1 className="app-bar-title">Automated KYC Portal</h1>
    </div>
);

export default AppBar;