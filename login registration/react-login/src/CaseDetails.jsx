import React, { useState } from 'react';
import Navinbar from './Navinbar';
import './CaseDetails.css'; // Ensure this file includes your updated CSS

const CaseDetails = () => {
    const [causeOfAction, setCauseOfAction] = useState('');
    const [dateOfCause, setDateOfCause] = useState('');
    const [importantInfo, setImportantInfo] = useState('');
    const [prayer, setPrayer] = useState('');
    const [valuation, setValuation] = useState('');
    const [localPlaint, setLocalPlaint] = useState(false);

    const [state, setState] = useState('Maharashtra');
    const [district, setDistrict] = useState('');
    const [taluka, setTaluka] = useState('');
    const [village, setVillage] = useState('');

    const [acts, setActs] = useState([{ act: '', section: '' }]);

    const [vadasKaran, setVadasKaran] = useState('');
    const [mahatwachiMahiti, setMahatwachiMahiti] = useState('');
    const [keleliMagni, setKeleliMagni] = useState('');

    const handleActChange = (index, field, value) => {
        const updatedActs = [...acts];
        updatedActs[index][field] = value;
        setActs(updatedActs);
    };

    const addAct = () => {
        setActs([...acts, { act: '', section: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log({
            causeOfAction,
            dateOfCause,
            importantInfo,
            prayer,
            valuation,
            localPlaint,
            state,
            district,
            taluka,
            village,
            acts,
            vadasKaran,
            mahatwachiMahiti,
            keleliMagni,
        });
    };

    return (
        <div>
            <Navinbar />
            <div className="case-details-container">
                <h2>Case Details</h2>
                <form className="case-details-form" onSubmit={handleSubmit}>

                    {/* Case Details Section */}
                    <div className="case-details-section">
                        <h3>Case Information</h3>

                        <div className="case-details-row">
                            <div className="case-details-form-group">
                                <label>Cause of Action *</label>
                                <input
                                    type="text"
                                    value={causeOfAction}
                                    onChange={(e) => setCauseOfAction(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="case-details-form-group">
                                <label>Date of Cause of Action *</label>
                                <input
                                    type="date"
                                    value={dateOfCause}
                                    onChange={(e) => setDateOfCause(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="case-details-row">
                            <div className="case-details-form-group">
                                <label>Important Information / Subject / Reason</label>
                                <textarea
                                    value={importantInfo}
                                    onChange={(e) => setImportantInfo(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="case-details-form-group">
                                <label>Prayer</label>
                                <textarea
                                    value={prayer}
                                    onChange={(e) => setPrayer(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="case-details-row">
                            <div className="case-details-form-group">
                                <label>Valuation</label>
                                <input
                                    type="text"
                                    value={valuation}
                                    onChange={(e) => setValuation(e.target.value)}
                                />
                            </div>

                            <div className="case-details-form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={localPlaint}
                                        onChange={(e) => setLocalPlaint(!localPlaint)}
                                    />
                                    Plaint in local language
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Dispute Arising Out of Section */}
                    <div className="case-details-section">
                        <h3>Dispute Arising Out of</h3>

                        <div className="case-details-row">
                            <div className="case-details-form-group">
                                <label>State</label>
                                <select value={state} onChange={(e) => setState(e.target.value)}>
                                    <option value="Maharashtra">Maharashtra</option>
                                    {/* Add more state options as needed */}
                                </select>
                            </div>

                            <div className="case-details-form-group">
                                <label>District</label>
                                <input
                                    type="text"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="case-details-row">
                            <div className="case-details-form-group">
                                <label>Taluka</label>
                                <input
                                    type="text"
                                    value={taluka}
                                    onChange={(e) => setTaluka(e.target.value)}
                                />
                            </div>

                            <div className="case-details-form-group">
                                <label>Village</label>
                                <input
                                    type="text"
                                    value={village}
                                    onChange={(e) => setVillage(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Act Details Section */}
                    <div className="case-details-section">
                        <h3>Act Details</h3>
                        {acts.map((act, index) => (
                            <div key={index} className="act-details-form-group">
                                <label>Act {index + 1} *</label>
                                <input
                                    type="text"
                                    value={act.act}
                                    onChange={(e) => handleActChange(index, 'act', e.target.value)}
                                    required
                                />

                                <label>Section {index + 1} *</label>
                                <input
                                    type="text"
                                    value={act.section}
                                    onChange={(e) => handleActChange(index, 'section', e.target.value)}
                                    required
                                />
                            </div>
                        ))}

                        <button type="button" onClick={addAct} className="add-act-btn">
                            Add More Acts
                        </button>
                    </div>

                    {/* Marathi Section */}
                    <div className="case-details-section">
                        <h3>माहिती मराठीत</h3>

                        <div className="case-details-row">
                            <div className="case-details-form-group">
                                <label>वादास कारण</label>
                                <textarea
                                    value={vadasKaran}
                                    onChange={(e) => setVadasKaran(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="case-details-form-group">
                                <label>महत्वाची माहिती / विषय / कारण</label>
                                <textarea
                                    value={mahatwachiMahiti}
                                    onChange={(e) => setMahatwachiMahiti(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="case-details-row">
                            <div className="case-details-form-group">
                                <label>केलेली मागणी</label>
                                <textarea
                                    value={keleliMagni}
                                    onChange={(e) => setKeleliMagni(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="case-details-form-actions">
                        <button type="button" className="case-details-btn-previous">Previous</button>
                        <button type="submit" className="case-details-btn-submit">Save</button>
                        <button type="button" className="case-details-btn-next">Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CaseDetails;
