import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DetailsPage.css';

const DetailsPage: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const formData = state?.formData || {};

    const handleConfirm = () => {
        navigate('/upload', { state: { formData } });
    };

    return (
        <div id="details-container">
            <header>
                <h1>Your Submitted Details</h1>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </header>
            <div id="details-body">
                <p><strong>Full Name:</strong> {formData.fullName}</p>
                <p><strong>Address:</strong> {formData.address}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Employment Type:</strong> {formData.employmentType}</p>
                <p><strong>Income Range:</strong> {formData.incomeRange}</p>
                <p><strong>Aadhaar Number:</strong> {formData.aadhaarNumber}</p>
                <p><strong>PAN Number:</strong> {formData.panNumber}</p>
                <p><strong>Aadhaar File:</strong> {formData.aadhaarFile?.name || 'Not uploaded'}</p>
                <p><strong>PAN File:</strong> {formData.panFile?.name || 'Not uploaded'}</p>
            </div>
            <footer>
                <button id="confirm-button" onClick={handleConfirm}>Confirm & Submit</button>
            </footer>
        </div>
    );
};

export default DetailsPage;
