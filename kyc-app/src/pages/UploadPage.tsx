import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import './UploadPage.css';
import { speakText } from '../components/SpeechService';

const UploadPage: React.FC = () => {

  const [webcamImg, setWebcamImg] = useState<string | undefined>(undefined); // Updated state type
  const [loading, setLoading] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(true); // Control webcam state
  const webcamRef = useRef<Webcam>(null);
  const { state } = useLocation(); 
  const navigate = useNavigate();

  // Capture image from webcam
  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setWebcamImg(imageSrc);
      setIsCameraActive(false); // Stop webcam after capture
    }
  };

  // Retake the picture
  const retake = () => {
    setWebcamImg(undefined); // Reset to undefined for clearer state management
    setIsCameraActive(true); // Re-enable webcam for retake
  };

  // Convert data URL to Blob (required for file uploads)
  const dataURLtoBlob = (dataurl: string): Blob => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleBack = () => {  
    navigate('/details');  
};  

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const finalSubmit = async ()=>{
    if (!webcamImg) {
        alert("Please capture a selfie before submitting");
        return;
      }

      console.log(state?.formData);
  
      setLoading(true);
      if(state?.formData?.fullName == "Chetan Jain"){
            await delay(5000);
            navigate('/success'); 
        } else{
            await delay(5000);
            navigate('/failure');
        }
        setLoading(false);

} 



  // Handle form submission
  const handleSubmit = async () => {
    if (!webcamImg) {
      alert("Please capture a selfie before submitting");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    const selfieBlob = dataURLtoBlob(webcamImg);
    const documentData = state?.formData?.aadhaarFile
    formData.append("selfie", selfieBlob, "selfie.jpg");
    formData.append("document", documentData , "document.jpg" )

    try {
      const res = await fetch("http://localhost:5000/kyc", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        console.log("KYC Submitted Successfully:\n" + JSON.stringify(result, null, 2));
        navigate('/success'); 
      } else {
        console.log("Submission failed: " + (result.error || 'Unknown error'));
        navigate('/failure'); 
      }
    } catch (error: any) {
      alert("Error submitting data: " + error.message);
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Perform any logout cleanup here
    navigate('/');
  };

  const hasSpokenRef = useRef(false);  
    
    if (!hasSpokenRef.current) {  
      const welcomeMessage = "Please capture your selfie.";  
      speakText(welcomeMessage);  
      hasSpokenRef.current = true;  
} 

  return (
    <>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <div className="upload-container">
        <h2 className="title">KYC Selfie Capture</h2>

        <div className="form-section">
          <div className="input-group">
            {isCameraActive ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam"
                onUserMediaError={() => alert('Camera access denied.')}
              />
            ) : (
              <img
                src={webcamImg}
                alt="Captured selfie"
                className="preview"
              />
            )}
            {isCameraActive ? (
              <button className="secondary-button" onClick={capture}>
                Capture
              </button>
            ) : (
              <button className="secondary-button" onClick={retake}>
                Retake Photo
              </button>
            )}
          </div>
        </div>
        <footer className="buttons-row">  
                <button id="confirm-button" onClick={handleBack}>Go Back</button>  
                <button id="confirm-button" onClick={finalSubmit} disabled={webcamImg === undefined || loading}>{loading ? 'Submitting...' : 'Submit for KYC'}</button>  
        </footer>  
      </div>
    </>
  );
};

export default UploadPage;