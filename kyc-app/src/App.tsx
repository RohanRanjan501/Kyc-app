import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import AppBar from './components/AppBar';
import FormPage from './pages/FormPage';
import DetailsPage from "./pages/DetailsPage.tsx";
import SuccessPage from './pages/SucessPage.tsx';
import FailurePage from './pages/FailurePage.tsx';

const App = () => (
    <div className="app-container">
        <AppBar />
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/failure" element={<FailurePage />} />

        </Routes>
    </div>
);

export default App;
