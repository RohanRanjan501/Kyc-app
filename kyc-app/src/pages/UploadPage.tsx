import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import './UploadPage.css';

const UploadPage = () => {
    const [image, setImage] = useState<File | null>(null);
    const [webcamImg, setWebcamImg] = useState<string | null>(null);
    const webcamRef = useRef<Webcam>(null);
    const navigate = useNavigate();

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) setWebcamImg(imageSrc);
    };

    const handleSubmit = async () => {
        if (!image || !webcamImg) {
            alert("Please upload a document and capture a selfie");
            return;
        }

        const formData = new FormData();
        formData.append("document", image);
        formData.append("selfie", webcamImg);

        try {
            const res = await fetch("http://localhost:5000/kyc", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            alert(JSON.stringify(result));
        } catch (error) {
            alert("Error submitting data.");
            console.error(error);
        }
    };

    const handleLogout = () => {
        // Clear auth if needed here
        navigate('/'); // Redirect to home page
    };

    return (
        <>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <div className="upload-container">
                <h2 className="title">KYC Document Upload</h2>
                <div className="form-section">
                    <div className="input-group">
                        <label>ID Document</label>
                        <label className="custom-file-upload">
                            <input
                                type="file"
                                onChange={(e) => e.target.files && setImage(e.target.files[0])}
                            />
                            Choose File
                        </label>
                        {image && <span style={{ marginTop: '10px' }}>{image.name}</span>}
                    </div>

                    <div className="input-group">
                        <label>Capture Selfie</label>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="webcam"
                        />
                        <button className="secondary-button" onClick={capture}>Capture</button>
                        {webcamImg && <img src={webcamImg} alt="selfie" className="preview" />}
                    </div>
                </div>

                <button className="submit-button" onClick={handleSubmit}>
                    Submit for KYC
                </button>
            </div>
        </>
    );
};

export default UploadPage;
