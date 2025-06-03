/// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import AppBar from './components/AppBar';

const App = () => (
    <div className="app-container">
        <AppBar />
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/upload" element={<UploadPage />} />
        </Routes>
    </div>
);

export default App;