import React, { useState, useEffect } from 'react';
import './data.css';
import Navinbar from './Navinbar';
import { useNavigate } from 'react-router-dom'; 


const New = () => {
    const [caseData, setCaseData] = useState([]);
    const navigate = useNavigate();

    // Fetch data from the backend when the component mounts
    useEffect(() => {
        const fetchCaseData = async () => {
            try {
                const response = await fetch('http://localhost:3001/caselitigent');
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


    const handleNextClick = () => {
        alert("Case submitted successfully");
        navigate('/dashboard'); // Navigate to dashboard
    };

    // Remove duplicates based on eFilingNumber
    const uniqueData = Array.isArray(caseData) ? Array.from(new Set(caseData.map(item => item.efilingNumber)))
        .map(efilingNumber => {
            // Find the case item with the corresponding eFilingNumber
            return caseData.find(item => item.efilingNumber === efilingNumber);
        }).filter(item => item !== undefined) : []; // Filter out undefined values

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
                                    <td>Form Type:</td>
                                    <td>{caseItem?.formType || "N/A"}</td>
                                    <td>EFiling Number:</td>
                                    <td>{caseItem?.efilingNumber || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Name:</td>
                                    <td>{caseItem?.name || "N/A"}</td>
                                    <td>Age:</td>
                                    <td>{caseItem?.age || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Relation:</td>
                                    <td>{caseItem?.relation || "N/A"}</td>
                                    <td>Date of Birth:</td>
                                    <td>{caseItem?.dob ? new Date(caseItem.dob).toLocaleDateString() : "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>{caseItem?.gender || "N/A"}</td>
                                    <td>Caste:</td>
                                    <td>{caseItem?.caste || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>{caseItem?.address || "N/A"}</td>
                                    <td>Email:</td>
                                    <td>{caseItem?.email || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Occupation:</td>
                                    <td>{caseItem?.occupation || "N/A"}</td>
                                    <td>Mobile No:</td>
                                    <td>{caseItem?.mobileNo || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>State:</td>
                                    <td>{caseItem?.state || "N/A"}</td>
                                    <td>District:</td>
                                    <td>{caseItem?.district || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Taluka:</td>
                                    <td>{caseItem?.taluka || "N/A"}</td>
                                    <td>Village:</td>
                                    <td>{caseItem?.village || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Complainant Name:</td>
                                    <td>{caseItem?.complainantName || "N/A"}</td>
                                    <td>Complainant Address:</td>
                                    <td>{caseItem?.complainantAddress || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Complainant Occupation:</td>
                                    <td>{caseItem?.complainantOccupation || "N/A"}</td>
                                    <td>Case Type:</td>
                                    <td>{caseItem?.caseType || "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Establishment:</td>
                                    <td>{caseItem?.establishment || "N/A"}</td>
                                    <td>Date Filed:</td>
                                    <td>{caseItem?.dateFiled ? new Date(caseItem.dateFiled).toLocaleDateString() : "N/A"}</td>
                                </tr>
                                <tr>
                                    <td>Legal Heir Name:</td>
                                    <td>{caseItem?.legalHeirName || "N/A"}</td>
                                    <td>Other Info:</td>
                                    <td>{caseItem?.otherInfo ? "Yes" : "No"}</td>
                                </tr>
                            </tbody>
                        </table>

                        <button className="efile-case-btn" onClick={handleNextClick}>Next</button>
                    </div>
                ))
            ) : (
                <p>No case details available.</p>
            )}
        </div>
        </div>
    );
};

export default New;
