
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navinbar from './Navinbar';
import './data.css';

const CaseFiling1 = () => {
    const [caseData, setCaseData] = useState([]);
    const [casehData, setCasehData] = useState([]);
    const navigate = useNavigate();

    // Fetch data from the backend when the component mounts
    useEffect(() => {
        const fetchCaseData = async () => {
            try {
                const response = await fetch('http://localhost:3001/case-management');
                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched case data:", data); // Log the fetched data
                    setCaseData(data); // Store the fetched data
                } else {
                    console.error('Failed to fetch case details');
                }
            } catch (error) {
                console.error('Error fetching case details:', error);
            }

            
        };

        fetchCaseData(); // Call the function to fetch data
    }, []);

    // Remove duplicates based on eFilingNumber
    const uniqueData = Array.isArray(caseData) ? Array.from(new Set(caseData.map(item => item.efilingNumber)))
        .map(efilingNumber => {
            // Find the case item with the corresponding eFilingNumber
            return caseData.find(item => item.efilingNumber === efilingNumber);
        }).filter(item => item !== undefined) : []; // Filter out undefined values

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for form submission if needed

        // Navigate to the next page (replace 'next-page' with your actual route)
        navigate('/sapdla');
    };

    return (
        <div>
            <Navinbar/>
            
        <div className="case-details-container">
            <h3>Fetched Case Details</h3>
            
            {uniqueData.length > 0 ? (
                uniqueData.map((caseItem, index) => (
                    <div key={index} className="case-details-table">
                        


                        <table className="case-details-body">
                            <tbody>
                                <tr>
                                    <td>Cause of Action:</td>
                                    <td>{caseItem?.causeOfAction || "N/A"}</td>
                                    <td>Relief Claimed:</td>
                                    <td>{caseItem?.reliefClaimed || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Date of Cause of Action:</td>
                                    <td>{caseItem?.dateOfCause || "N/A"}</td>
                                    <td>Amount:</td>
                                    <td>{caseItem?.amount || "0.00"}</td>
                                </tr>
                                <tr>
                                    <td>Date of Filing:</td>
                                    <td>{caseItem?.dateOfFiling || "N/A"}</td>
                                    <td>Plaint in Local Language:</td>
                                    <td>{caseItem?.localLanguage || "N"}</td>
                                </tr>
                                <tr>
                                    <td>State:</td>
                                    <td>{caseItem?.state || "MAHARASHTRA"}</td>
                                    <td>District:</td>
                                    <td>{caseItem?.district || "PUNE"}</td>
                                </tr>
                                <tr>
                                    <td>Taluka:</td>
                                    <td>{caseItem?.taluka || "N/A"}</td>
                                    <td>Village:</td>
                                    <td>{caseItem?.village || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Important Information or Subject/Reason:</td>
                                    <td colSpan="3">{caseItem?.importantInfo || "N/A"}</td>
                                </tr>
                            </tbody>
                        </table>

                        <button className="efile-case-btn" onClick={handleSubmit}>next</button>
                    </div>
                ))
            ) : (
                <p>No case details available.</p>
            )}
        </div>
        </div>
    );
};

export default CaseFiling1;