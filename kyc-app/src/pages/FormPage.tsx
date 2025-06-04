import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';

const FormPage: React.FC = () => {
    const [formData, setFormData] = useState({
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
    });

    const navigate = useNavigate();

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

    return (
        <div id="modern-form-container">
            <header id="form-header-section">
                <h1 id="form-main-header">Personal Information Form</h1>
                <p id="form-description">Fill out your personal details and upload required documents. Click Next to proceed.</p>
            </header>

            <form id="form-body">
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
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
                </div>

                <div className="form-row">
                    <div className="form-field">
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
                    <div className="form-field">
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
                    <div className="form-field">
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

                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="aadhaarFile">Upload Aadhaar</label>
                        <input
                            type="file"
                            id="aadhaarFile"
                            name="aadhaarFile"
                            onChange={handleFileUpload}
                        />
                        {formData.aadhaarFile && (
                            <span className="file-upload-name">{formData.aadhaarFile.name}</span>
                        )}
                    </div>
                    <div className="form-field">
                        <label htmlFor="panFile">Upload PAN</label>
                        <input
                            type="file"
                            id="panFile"
                            name="panFile"
                            onChange={handleFileUpload}
                        />
                        {formData.panFile && (
                            <span className="file-upload-name">{formData.panFile.name}</span>
                        )}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="photoFile">Upload Photo</label>
                        <input
                            type="file"
                            id="photoFile"
                            name="photoFile"
                            onChange={handleFileUpload}
                        />
                        {formData.photoFile && (
                            <span className="file-upload-name">{formData.photoFile.name}</span>
                        )}
                    </div>
                    <div className="form-field">
                        <label htmlFor="signatureFile">Upload Signature</label>
                        <input
                            type="file"
                            id="signatureFile"
                            name="signatureFile"
                            onChange={handleFileUpload}
                        />
                        {formData.signatureFile && (
                            <span className="file-upload-name">{formData.signatureFile.name}</span>
                        )}
                    </div>
                </div>

                <div className="form-row">
                    <button type="button" id="next-button" onClick={handleNext}>
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormPage;
