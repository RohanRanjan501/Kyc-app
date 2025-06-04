// import React, { useState, useRef, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import * as faceapi from 'face-api.js';
// import './UploadPage.css';
//
// const UploadPage = () => {
//     const webcamRef = useRef<Webcam>(null);
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const [webcamReady, setWebcamReady] = useState(false);
//     const [webcamImg, setWebcamImg] = useState<string | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//
//     // Load face-api models on mount
//     useEffect(() => {
//         const loadModels = async () => {
//             const MODEL_URL = process.env.PUBLIC_URL + '/models';
//             await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//             setWebcamReady(true);
//         };
//         loadModels();
//     }, []);
//
//     // Face detection & drawing loop
//     useEffect(() => {
//         let intervalId: NodeJS.Timeout;
//
//         if (webcamReady) {
//             intervalId = setInterval(async () => {
//                 if (
//                     webcamRef.current &&
//                     webcamRef.current.video &&
//                     canvasRef.current
//                 ) {
//                     const video = webcamRef.current.video;
//                     const canvas = canvasRef.current;
//                     const displaySize = {
//                         width: video.videoWidth,
//                         height: video.videoHeight,
//                     };
//                     faceapi.matchDimensions(canvas, displaySize);
//                     const detections = await faceapi.detectAllFaces(
//                         video,
//                         new faceapi.TinyFaceDetectorOptions()
//                     );
//                     const resizedDetections = faceapi.resizeResults(detections, displaySize);
//
//                     const ctx = canvas.getContext('2d');
//                     if (!ctx) return;
//                     ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//                     resizedDetections.forEach(detection => {
//                         const { x, y, width, height } = detection.box;
//                         ctx.strokeStyle = 'limegreen';
//                         ctx.lineWidth = 3;
//                         ctx.strokeRect(x, y, width, height);
//                     });
//                 }
//             }, 100);
//         }
//
//         return () => clearInterval(intervalId);
//     }, [webcamReady]);
//
//     const capture = () => {
//         const imageSrc = webcamRef.current?.getScreenshot();
//         if (imageSrc) {
//             setWebcamImg(imageSrc);
//             setSuccessMessage(null);
//             setError(null);
//         }
//     };
//
//     const handleSubmit = () => {
//         if (!webcamImg) {
//             setError("Please capture a selfie before submitting.");
//             setSuccessMessage(null);
//             return;
//         }
//         setSuccessMessage("Selfie submitted successfully!");
//         setError(null);
//     };
//
//     return (
//         <div className="upload-container">
//             <h2 className="title">KYC Selfie Capture</h2>
//
//             {error && <div className="error-message">{error}</div>}
//             {successMessage && <div className="success-message">{successMessage}</div>}
//
//             <div className="webcam-wrapper">
//                 <Webcam
//                     audio={false}
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     width={640}
//                     height={480}
//                     videoConstraints={{ width: 640, height: 480, facingMode: 'user' }}
//                     className="webcam-video"
//                 />
//                 <canvas ref={canvasRef} className="overlay-canvas" />
//             </div>
//
//             <div className="button-row">
//                 <button className="capture-button" onClick={capture}>
//                     Capture Selfie
//                 </button>
//                 <button className="submit-button" onClick={handleSubmit}>
//                     Submit
//                 </button>
//             </div>
//
//             {webcamImg && (
//                 <div className="preview-section">
//                     <h3>Captured Selfie Preview:</h3>
//                     <img src={webcamImg} alt="Captured selfie" className="preview-image" />
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default UploadPage;

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import './UploadPage.css';

const UploadPage: React.FC = () => {
    const [webcamImg, setWebcamImg] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);
    const navigate = useNavigate();

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setWebcamImg(imageSrc);
        }
    };

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

    const handleSubmit = async () => {
        if (!webcamImg) {
            alert("Please capture a selfie before submitting");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        const selfieBlob = dataURLtoBlob(webcamImg);
        formData.append("selfie", selfieBlob, "selfie.jpg");

        try {
            const res = await fetch("http://localhost:5000/kyc", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                alert("KYC Submitted Successfully:\n" + JSON.stringify(result, null, 2));
            } else {
                alert("Submission failed: " + (result.error || 'Unknown error'));
            }
        } catch (error: any) {
            alert("Error submitting data: " + error.message);
            console.error("Submission error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Perform any logout cleanup here
        navigate('/');
    };

    return (
        <>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>

            <div className="upload-container">
                <h2 className="title">KYC Selfie Capture</h2>

                <div className="form-section">
                    <div className="input-group">
                        <label>Capture Selfie</label>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="webcam"
                        />
                        <button className="secondary-button" onClick={capture}>
                            Capture
                        </button>
                        {webcamImg && (
                            <img
                                src={webcamImg}
                                alt="Captured selfie"
                                className="preview"
                            />
                        )}
                    </div>
                </div>

                <button
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={!webcamImg || loading}
                >
                    {loading ? 'Submitting...' : 'Submit for KYC'}
                </button>
            </div>
        </>
    );
};

export default UploadPage;

