import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './UploadPage.css';

const UploadPage = () => {
    const [image, setImage] = useState<File | null>(null);
    const [webcamImg, setWebcamImg] = useState<string | null>(null);
    const webcamRef = useRef<Webcam>(null);

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) setWebcamImg(imageSrc);
    };

    const handleSubmit = async () => {
        if (!image || !webcamImg) return alert("Please upload a document and capture a selfie");

        const formData = new FormData();
        formData.append("document", image);
        formData.append("selfie", webcamImg);

        const res = await fetch("http://localhost:5000/kyc", {
            method: "POST",
            body: formData
        });

        const result = await res.json();
        alert(JSON.stringify(result));
    };

    return (
        <div className="upload-container">
            <h2>KYC Document Upload</h2>
            <div className="form-section">
                <div>
                    <label>ID Document</label>
                    <input type="file" onChange={(e) => e.target.files && setImage(e.target.files[0])} />
                </div>
                <div>
                    <label>Capture Selfie</label>
                    <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="webcam" />
                    <button onClick={capture}>Capture</button>
                    {webcamImg && <img src={webcamImg} alt="selfie" className="preview" />}
                </div>
            </div>
            <button className="submit-button" onClick={handleSubmit}>Submit for KYC</button>
        </div>
    );
};

export default UploadPage;