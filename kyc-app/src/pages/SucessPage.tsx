import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SuccessPage.css';
import { speakText } from '../components/SpeechService';

interface SuccessPageProps {
  successMessage: string;
  successPoints: string[];
}

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const handleContinue = () => {
    navigate('/home'); // Navigate to another page, like dashboard, after success
  };

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Set a timeout of 5 seconds to display the check marks
    const timer = setTimeout(() => {
      setShowSuccess(true);
      const welcomeMessage = "Your KYC process was successful";  
      speakText(welcomeMessage);  
    }, 5000);

    // Cleanup timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="success-container">
      <h2 className="success-title">KYC Submission Successful!</h2>
      {/* <p className="success-message">{ 'Your KYC process was successful.'}</p> */}

      <ul className="success-list">
      <li className="success-point">
                <span className="success-icon">{showSuccess ? "✓" : ""}</span> Document Authenticity 
                <span className="success-icon"></span><div>The extracted data is accurate and matches the user’s submission.</div>
              </li> 
            <li className="success-point">
                <span className="success-icon">{showSuccess ? "✓" : ""}</span> Face Matching 
                <span className="success-icon"></span><div>The face matches your uploaded image. Your identity is confirmed, and your KYC process is complete.</div>
              </li> 
              
      </ul>

      <button className="continue-button" onClick={handleContinue}>
        Continue to Dashboard
      </button>
    </div>
  );
};

export default SuccessPage;
