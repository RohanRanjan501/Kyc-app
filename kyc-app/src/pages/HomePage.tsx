import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleStartKYC = () => {
        navigate('/form');
    };

    return (
        <div className="home-container">
            <h2 className="home-title">KYC Process Explained</h2>
            <div className="steps-container">
                <div className="step-card">
                    <h3>Fill your Personal Details</h3>
                    <p>Provide your personal information such as name, address, and contact details.</p>
                </div>
                <div className="step-card">
                    <h3>Upload your Documents</h3>
                    <p>Upload necessary documents such as aadhaar card, pan card, and any other required documents.</p>
                </div>
                <div className="step-card">
                    <h3>Verify Aadhaar Details</h3>
                    <p>Verify your Aadhaar details to confirm your identity.</p>
                </div>
                <div className="step-card">
                    <h3>Video KYC Document Verification</h3>
                    <p>Undergo a video KYC process for document verification.</p>
                </div>
            </div>
            <button className="start-button" onClick={handleStartKYC}>Start your KYC</button>
        </div>
    );
};

export default HomePage;
