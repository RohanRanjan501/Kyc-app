import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FormPage.css';
import { speakText } from '../components/SpeechService';  

const FormPage: React.FC = () => {
    const { state } = useLocation();

    const navigate = useNavigate();

    const [formData, setFormData] = useState(() => {  
        return state?.formData || {  
            fullName: '',  
            address: '',  
            email: '',  
            incomeRange: '',  
            employmentType: '',  
            aadhaarNumber: '',  
            panNumber: '',  
            aadhaarFile: null,  
            panFile: null,  
            photoFile: null,  
            signatureFile: null,  
        };  
    }); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleNext = () => {
        navigate('/details', { state: { formData } });
    };

    const handleBack = () => {
        navigate('/home');
    };

    const hasSpokenRef = useRef(false);  
  
  if (!hasSpokenRef.current) {  
    const welcomeMessage = "Welcome to the Personal Information Form. Please fill out your details and upload the required documents.";  
    speakText(welcomeMessage);  
    hasSpokenRef.current = true;  
  } 

    return (
        <div id="modern-form-container">
            <header id="form-header-section">
                <h1 id="form-main-header">Personal Information Form</h1>
                <p id="form-description">Fill out your personal details and upload required documents. Click Next to proceed.</p>
            </header>

            <form id="form-body">
                <div className="form-row">
                    <div className="form-field" onClick={() =>{speakText("Please Enter Your Fullname")}}>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                
                    <div className="form-field" onClick={() => speakText("Please Enter Your Address")}>  
                        <label htmlFor="address">Address</label>  
                            <input  
                            type="text"  
                            id="address"  
                            name="address"  
                            value={formData.address}  
                            onChange={handleChange}  
                            style={{ gridColumn: 'span 2' }} // Ensure it spans across both columns  
                            />  
                    </div>
                </div>

                <div className="form-row">  
                    <div className="form-field" onClick={() =>{speakText("Please Enter Your Email Address")}}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>  
                </div> 

                <div className="form-row">
                    <div className="form-field" onClick={() =>{speakText("Please Enter Your Employment Type")}}>
                        <label htmlFor="employmentType">Employment Type</label>
                        <select
                            id="employmentType"
                            name="employmentType"
                            value={formData.employmentType}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Salaried">Salaried</option>
                            <option value="Self Employed">Self Employed</option>
                            <option value="Unemployed">Unemployed</option>
                        </select>
                    </div>
                    <div className="form-field" onClick={() =>{speakText("Please Enter Your Aadhaar Number")}}>
                        <label htmlFor="aadhaarNumber">Aadhaar Number</label>
                        <input
                            type="text"
                            id="aadhaarNumber"
                            name="aadhaarNumber"
                            value={formData.aadhaarNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-field" onClick={() =>{speakText("Please Enter Your Income Range")}}>
                        <label htmlFor="incomeRange">Income Range</label>
                        <select
                            id="incomeRange"
                            name="incomeRange"
                            value={formData.incomeRange}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="0-5L">0-5L</option>
                            <option value="5-10L">5-10L</option>
                            <option value="10L+">10L+</option>
                        </select>
                    </div>
                    
                    <div className="form-field" onClick={() =>{speakText("Please Enter Your PAN Card Number")}}>
                        <label htmlFor="panNumber">PAN Card Number</label>
                        <input
                            type="text"
                            id="panNumber"
                            name="panNumber"
                            value={formData.panNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-documents">  
                    <div className="form-field-doc" onClick={() => speakText("Please Upload Your Aadhaar")}>  
                        <label htmlFor="aadhaarFile">Upload Aadhaar</label>  
                        <input type="file" id="aadhaarFile" name="aadhaarFile" onChange={handleFileUpload} />  
                        {formData.aadhaarFile && (  
                            <img src={URL.createObjectURL(formData.aadhaarFile)} alt="Uploaded Aadhaar" className="image-preview" />  
                        )}  
                    </div>  
                    <div className="form-field-doc" onClick={() => speakText("Please Upload Your PAN")}>  
                        <label htmlFor="panFile">Upload PAN</label>  
                        <input type="file" id="panFile" name="panFile" onChange={handleFileUpload} />  
                        {formData.panFile && (  
                            <img src={URL.createObjectURL(formData.panFile)} alt="Uploaded PAN" className="image-preview" />  
                        )}  
                    </div>
                    <div className="form-field-doc" onClick={() => speakText("Please Upload Your Photo")}>  
                        <label htmlFor="photoFile">Upload Photo</label>  
                        <input type="file" id="photoFile" name="photoFile" onChange={handleFileUpload} />  
                        {formData.photoFile && (  
                            <img src={URL.createObjectURL(formData.photoFile)} alt="Uploaded PAN" className="image-preview" />  
                        )}  
                    </div>
                    <div className="form-field-doc" onClick={() => speakText("Please Upload Your Signature")}>  
                        <label htmlFor="signatureFile">Upload Signature</label>  
                        <input type="file" id="signatureFile" name="signatureFile" onChange={handleFileUpload} />  
                        {formData.signatureFile && (  
                            <img src={URL.createObjectURL(formData.signatureFile)} alt="Uploaded Signature" className="image-preview" />  
                        )}  
                    </div>
                </div>

                <div className="form-row buttons-row">  
                    <button type="button" id="go-back-button" onClick={handleBack}>  
                        Go Back  
                    </button>  
                    <button type="button" id="next-button" onClick={handleNext}>  
                        Next  
                    </button>  
                </div>  
            </form>
        </div>
    );
};

export default FormPage;
