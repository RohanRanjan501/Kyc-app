import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  
import './DetailsPage.css';
import { speakText } from '../components/SpeechService';  
  
const DetailsPage: React.FC = () => {  
    const { state } = useLocation();  
    const navigate = useNavigate();  
    const formData = state?.formData || {};  
  
    const handleConfirm = () => {  
        navigate('/upload', { state: { formData } });  
    };  
  
    const handleBack = () => {  
        navigate('/form', { state: { formData } });  
    };  

    const hasSpokeDetails = useRef(false);  
      
      if (!hasSpokeDetails.current) {  
        const welcomeMessage = "Please review your details and your uploaded required documents.";  
        speakText(welcomeMessage);  
        hasSpokeDetails.current = true;  
      } 
  
    return (  
        <div id="details-container">  
            <header>  
                <h1>Your Submitted Details</h1>  
            </header>  
            <div id="details-body">  
                <p><strong>Full Name:</strong> {formData.fullName}</p>  
                <p><strong>Address:</strong> {formData.address}</p>  
                <p><strong>Email:</strong> {formData.email}</p>  
                <p><strong>Employment Type:</strong> {formData.employmentType}</p>  
                <p><strong>Income Range:</strong> {formData.incomeRange}</p>  
                <p><strong>Aadhaar Number:</strong> {formData.aadhaarNumber}</p>  
                <p><strong>PAN Number:</strong> {formData.panNumber}</p>  
                <div className="document-row">  
                    <div className="document">  
                        <p><strong>Aadhaar File:</strong></p>  
                        {formData.aadhaarFile && (  
                            <img src={URL.createObjectURL(formData.aadhaarFile)} alt="Uploaded Aadhaar" className="image-preview" />  
                        )}  
                    </div>  
                    <div className="document">  
                        <p><strong>PAN File:</strong></p>  
                        {formData.panFile && (  
                            <img src={URL.createObjectURL(formData.panFile)} alt="Uploaded PAN" className="image-preview" />  
                        )}  
                    </div>  
                </div>  
            </div>  
            <footer className="buttons-row">  
                <button id="confirm-button" onClick={handleBack}>Go Back</button>  
                <button id="confirm-button" onClick={handleConfirm}>Confirm & Submit</button>  
            </footer>  
        </div>  
    );  
};  
  
export default DetailsPage;