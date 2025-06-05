import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FailurePage.css';
import { speakText } from '../components/SpeechService';

interface FailurePageProps {
  errorMessage: string;
  failurePoints: string[]; // Add an array of failure points
}

const FailurePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/upload'); // Navigate back to the upload page to retry
  };

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
      // Set a timeout of 5 seconds to display the check marks
      const timer = setTimeout(() => {
        setShowSuccess(true);
        const welcomeMessage = "Your KYC process was unsuccessful";  
        speakText(welcomeMessage);  
      }, 5000);
  
      // Cleanup timeout if the component is unmounted
      return () => clearTimeout(timer);
    }, []);

  return (
    <div className="failure-container">
      <h2 className="failure-title">KYC Submission Failed</h2>
      {/* <p className="error-message"></p> */}

      <ul className="failure-list">
            <li className="failure-point">
                <span className="failure-icon">{showSuccess ? "×" : ""}</span> Face Matching Failure
                <div>It seems that the photo you uploaded does not match the face on your identity document. Please ensure that your photo is clear, well-lit, and the face is visible without obstructions like glasses or hats.</div>
              </li> 
              <li className="failure-point">
                <span className="failure-icon">{showSuccess ? "×" : ""}</span> Document Authenticity Issues
                <div>The document appears to have authenticity issues, possibly due to low image resolution or incorrect formatting. Please upload a high-quality image of your document.</div>
              </li> 
      </ul>

      <button className="retry-button" onClick={handleRetry}>
        Retry Submission
      </button>
    </div>
  );
};

export default FailurePage;
