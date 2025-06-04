import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Navigate to a desired page, such as the home or dashboard
    navigate('/');
  };

  return (
    <div className="success-container">
      <h2 className="success-title">KYC Submitted Successfully!</h2>
      <p>Your KYC has been successfully submitted and is now being processed. You will be notified once it's completed.</p>

      <button className="success-button" onClick={handleRedirect}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default SuccessPage;
