import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FailurePage.css';

interface FailurePageProps {
  errorMessage: string;
}

const FailurePage: React.FC = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Navigate back to the upload page to try again
    navigate('/upload');
  };

  return (
    <div className="failure-container">
      <h2 className="failure-title">KYC Submission Failed</h2>
      <p className="error-message">'An unknown error occurred. Please try again later.'</p>

      <button className="retry-button" onClick={handleRetry}>
        Retry Submission
      </button>
    </div>
  );
};

export default FailurePage;
