import React, { useState } from 'react';
import Navinbar from './Navinbar';
import './CaseDetails.css'; // Ensure this file includes your updated CSS
import { useNavigate } from 'react-router-dom';

const CaseDetails = () => {
    const [causeOfAction, setCauseOfAction] = useState('');
    const [dateOfCause, setDateOfCause] = useState('');
    const [importantInfo, setImportantInfo] = useState('');
    const [prayer, setPrayer] = useState('');
    const [valuation, setValuation] = useState('');
    const [localPlaint, setLocalPlaint] = useState(false);
    const [fData, setFData] = useState({ state: 'Maharashtra', district: '' }); 
    const [state, setState] = useState('Maharashtra');
    const [district, setDistrict] = useState('aurangabad');
    const [taluka, setTaluka] = useState('kannad');
    const [village, setVillage] = useState('usmandbad');

    const [acts, setActs] = useState([{ act: '', section: '' }]);

    const [vadasKaran, setVadasKaran] = useState('');
    const [mahatwachiMahiti, setMahatwachiMahiti] = useState('');
    const [keleliMagni, setKeleliMagni] = useState('');

    const stateDistricts = {
        AP: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", "Kurnool", "Prakasam", "Nellore", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"],
        AR: ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kra Daadi", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Namsai", "Papum Pare", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang", "Itanagar"],
        AS: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup (Rural)", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
        BR: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
        CG: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
        GA: ["North Goa", "South Goa"],
        GJ: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
        HR: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
        HP: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
        JK: ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kargil", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Leh", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
        JH: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
        KA: ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Vijayapura", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Gulbarga", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Yadgir"],
        KL: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
        MP: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
        MH: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
        MN: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
        ML: ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
        MZ: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
        NL: ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
        OR: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundergarh"],
        PB: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawanshahr", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar", "Tarn Taran"],
        RJ: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
        SK: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
        TN: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
        TS: ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalapally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahbubnagar", "Mancherial", "Medak", "Medchal Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
        TR: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
        UP: ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
        UT: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
        WB: ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
      };

    const navigate = useNavigate();

    const handleActChange = (index, field, value) => {
        const updatedActs = [...acts];
        updatedActs[index][field] = value;
        setActs(updatedActs);
    };

    const addAct = () => {
        setActs([...acts, { act: '', section: '' }]);
    };

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        navigate('/case-submit')// Prevent default form submission

    const formData = {
        causeOfAction,
        dateOfCause,
        importantInfo,
        prayer,
        valuation,
        localPlaint,
        state:fData.state,
        district:fData.district,
        taluka,
        village,
        acts,
        vadasKaran,
        mahatwachiMahiti,
        keleliMagni,
    };

    try {
        const response = await fetch('http://localhost:3001/api/case-management', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        
        if (response.ok)
        {
            const data = await response.json();
            console.log('Success:', data);
            alert('update successful')
        }
        
        // Handle success (e.g., show a success message or redirect)
    } catch (error) {
        console.error('Error:', error);
        // Handle error (e.g., show an error message)
    }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFData((prevData) => ({
            ...prevData,
            [name]: value
        }));
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
                                <select name="state" value={fData.state} onChange={handleChange}>
                                <option value="AP">Andhra Pradesh</option>
	                            <option value="AN">Andaman and Nicobar Islands</option>
                                <option value="AR">Arunachal Pradesh</option>
	                            <option value="AS">Assam</option>
	                            <option value="BR">Bihar</option>
	                            <option value="CH">Chandigarh</option>
	                           <option value="CT">Chhattisgarh</option>
                               <option value="DN">Dadra and Nagar Haveli</option>
	                           <option value="DD">Daman and Diu</option>
	                           <option value="LD">Lakshadweep</option>
	                           <option value="DL">Delhi</option>
	                           <option value="GA">Gujarat</option>
	                           <option value="HR">Haryana</option>
	                           <option value="HP">Himachal Pradesh</option>
	                           <option value="JK">Jammu and Kashmir</option>
	                           <option value="GA">Goa</option>
	                           <option value="JH">Jharkhand</option>
	                           <option value="KA">Karnataka</option>
	                           <option value="KL">Kerala</option>
	                           <option value="PY">Puducherry</option>
	                           <option value="MP">Madhya Pradesh</option>
	                           <option value="MH">Maharashtra</option>
                               <option value="MN">Manipur</option>
                               <option value="ML">Meghalaya</option>
	                           <option value="MZ">Mizoram</option>
	                           <option value="NL">Nagaland</option>
	                           <option value="OR">Odisha</option>
	                           <option value="PB">Punjab</option>
	                           <option value="RJ">Rajasthan</option>
	                           <option value="SK">Sikkim</option>
	                           <option value="TN">Tamil Nadu</option>
	                           <option value="TG">Telangana</option>
	                           <option value="TR">Tripura</option>
	                           <option value="UT">Uttarakhand</option>
	                           <option value="UP">Uttar Pradesh</option>
	                           <option value="WB">West Bengal</option>
                                </select>
                            </div>

                            <div className="case-details-form-group">
                                <label>District</label>
                                <select name="district" value={fData.district} onChange={handleChange}>
                                    {/* <option value="Aurangabad">Aurangabad</option> */}
                                    {fData.state && stateDistricts[fData.state]?.map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="case-details-row">
                            <div className="case-details-form-group">
                                <label>Taluka</label>
                                <select value={taluka} onChange={(e) => setTaluka(e.target.value)}>
                                    <option value="kannad">kannad</option>
                                    {/* Add more state options as needed */}
                                </select>
                            </div>

                            <div className="case-details-form-group">
                                <label>Village</label>
                                <select value={village} onChange={(e) => setVillage(e.target.value)}>
                                    <option value="talpimpri">talpimpri</option>
                                    {/* Add more state options as needed */}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Act Details Section */}
                    <div className="case-details-section">
                        <h3>Act Details</h3>
                        {acts.map((act, index) => (
                            <div key={index} className="act-details-form-group">
                                <label>Act {index + 1} *</label>
                                <select
                                    value={act.act}
                                    onChange={(e) => handleActChange(index, 'act', e.target.value)}
                                    required
                                >
                                    <option value="">Select Act</option>
                                    <option id='ACT 1' value='1' title='- Purpose: Governs rules regarding evidence admissibility in courts, now recognizing digital and electronic evidence.
- Parts:  
- Part I – Definitions (e.g., “document,” “evidence”).  
- Part II – Relevancy of facts.  
- Part III – Proof of facts.  
- Part IV – Production and effect of evidence.'>Bhartiya Sakshya Adhiniyam, 2023 (Indian Evidence Act, 2023)</option>
                                    <option id='ACT 2' value='2' title='- Purpose: Replaces the Criminal Procedure Code (CrPC) and modernizes procedures for criminal trials.
- Key Issues:  
  - Issue 127 – Mentions “seditious matters,” though sedition isn’t explicitly defined in BNSS.  
  - Issue 217 – Incorrect reference to offences against the human body (Chapter VI), confused with IPC’s chapter on offences against the state.  
  - Issue 482 – Bail conditions refer to incorrect chapters between BNSS and BNS.
'>Bhartiya Nagrik Suraksha Sanhita (BNSS), 2023 </option>
                                    <option id='ACT 3' value='3' title='- Purpose: Replaces the IPC, introduces reforms in criminal law.
- Key Changes:  
  - Sedition modified to address threats to sovereignty.  
  - Sexual Offences: Adds provisions for exploitation under false promises.  
  - Adultery: Not criminalized but noted for its civil consequences.  
  - Murder: Now under Section 101 of BNS (earlier 302 of IPC).  
  - Community Service as an alternative punishment for defamation.
'> Bhartiya Nyaya Sanhita (BNS), 2023  </option>
                                    <option id='ACT 4' value='4' title='- Purpose: Framework for the filing and processing of civil suits.
- Key Parts:  
  - Body of the Code: Jurisdiction, orders, decrees, judgments.  
  - First Schedule: 51 Orders detailing procedural rules.  
  - Key Sections: Execution (3674), Appeals (96115), Costs (3535B).
'>Civil Procedure Code (CPC), 1908</option>
                                    <option id='ACT 5' value='5' title='- Purpose: Provides remedies other than monetary compensation.  
- Key Provisions:  
  - Specific Performance (Sections 9–25).  
  - Injunctions (Sections 36–42).  
  - Declaratory Decrees (Section 34).  
  - Rectification/Cancellation (Sections 26–31).  
  - Recovery of Possession (Section 58).'>Specific Relief Act, 1963</option>
                                    <option id='ACT 6' value='6' title='- Purpose: Regulates the transfer of property in India.  
- Subtypes:  
  - Sale and Mortgage: Covers ownership transfer and property as security.  
  - Lease: Temporary transfer for rent/compensation.  
  - Gift: Voluntary, without consideration.  
  - Actionable Claims: Rights enforceable through courts.'>Transfer of Property Act, 1882 </option>
                                    <option id='ACT 7' value='7' title='- Purpose: Lays down principles of valid contracts and special agreements.  
- General Contracts (Sections 1–75):  
  - Offer, Acceptance, Consideration: Formation of contracts.  
  - Capacity and Free Consent: Legal competence and voluntary agreement.  
  - Void and Voidable Contracts: Grounds for invalidity.  
- Special Contracts:  
  - Indemnity and Guarantee (124–147).  
  - Bailment and Pledge (148–181).  
  - Agency (182–238): Principal-agent relationships.'> Indian Contract Act, 1872</option>
                                    

                                    {/* Add more acts as needed */}
                                </select>

                                <label>Section {index + 1} *</label>
                                <select
                                    value={act.section}
                                    onChange={(e) => handleActChange(index, 'section', e.target.value)}
                                    required
                                >
                                    <option value="">Select Section</option>
                                    <option id='Section-1' value='1' title='Title and extent of operation of the Code'>Section 1</option>
                                    <option id='Section-2' value='2' title='Punishment of offences committed within India'>Section 2</option>
                                    <option id='Section-3' value='3' title='Punishment of offences committed beyond, but which by law may be tried within, India'>Section 3</option>
                                    <option id='Section-4' value='4' title='Extension of Code to extra-territorial offences'>Section 4</option>
                                    <option id='Section-5' value='5' title='Certain laws not to be affected by this Act'>Section 5</option>
                                    <option id='Section-6' value='6' title='Definitions in the Code to be understood subject to exceptions'>Section 6</option>
                                    <option id='Section-8' value='8' title='Gender'>Section 8</option>
                                    <option id='Section-9' value='9' title='Number'>Section 9</option>
                                    <option id='Section-10' value='10' title='Man, Woman'>Section 10</option>
                                    <option id='Section-11' value='11' title='Person'>Section 11</option>
                                    <option id='Section-24' value='24' title='Dishonestly'>Section 24</option>
                                    <option id='Section-25' value='25' title='Fraudulently'>Section 25</option>
                                    <option id='Section-34' value='34' title='Acts done by several persons in furtherance of common intention'>Section 34</option>
                                    <option id='Section-52' value='52' title='Good faith'>Section 52</option>
                                    <option id='Section-96' value='96' title='Things done in private defence'>Section 96</option>
                                    <option id='Section-99' value='99' title='Act against which there is no right of private defence'>Section 99</option>
                                    <option id='Section-120B' value='120B' title='Punishment of criminal conspiracy'>Section 120B</option>
                                    <option id='Section-121' value='121' title='Waging, or attempting to wage war, or abetting waging of war, against the Government of India'>Section 121</option>
                                    <option id='Section-124A' value='124A' title='Sedition'>Section 124A</option>
                                    <option id='Section-131' value='131' title='Abetment of mutiny'>Section 131</option>
                                    <option id='Section-141' value='141' title='Unlawful assembly'>Section 141</option>
                                    <option id='Section-159' value='159' title='Affray'>Section 159</option>
                                    <option id='Section-166' value='166' title='Public servant disobeying law, with intent to cause injury'>Section 166</option>
                                    <option id='Section-171B' value='171B' title='Bribery at elections'>Section 171B</option>
                                    <option id='Section-188' value='188' title='Disobedience to order duly promulgated by public servant'>Section 188</option>
                                    <option id='Section-191' value='191' title='Giving false evidence'>Section 191</option>
                                    <option id='Section-193' value='193' title='Punishment for false evidence'>Section 193</option>
                                    <option id='Section-223' value='223' title='Escape from confinement or custody negligently suffered by public servant'>Section 223</option>
                                    <option id='Section-268' value='268' title='Public nuisance'>Section 268</option>
                                    <option id='Section-294' value='294' title='Obscene acts and songs'>Section 294</option>
                                    <option id='Section-295' value='295' title='Injuring or defiling place of worship with intent to insult the religion of any class'>Section 295</option>
                                    <option id='Section-299' value='299' title='Culpable homicide'>Section 299</option>
                                    <option id='Section-302' value='302' title='Punishment for murder'>Section 302</option>
                                    <option id='Section-304A' value='304A' title='Causing death by negligence'>Section 304A</option>
                                    <option id='Section-307' value='307' title='Attempt to murder'>Section 307</option>
                                    <option id='Section-309' value='309' title='Attempt to commit suicide'>Section 309</option>
                                    <option id='Section-312' value='312' title='Causing miscarriage'>Section 312</option>
                                    <option id='Section-319' value='319' title='Hurt'>Section 319</option>
                                    <option id='Section-326' value='326' title='Voluntarily causing grievous hurt by dangerous weapons or means'>Section 326</option>
                                    <option id='Section-339' value='339' title='Wrongful restraint'>Section 339</option>
                                    <option id='Section-351' value='351' title='Assault'>Section 351</option>
                                    <option id='Section-354' value='354' title='Assault or criminal force to woman with intent to outrage her modesty'>Section 354</option>
                                    <option id='Section-354A' value='354A' title='Sexual harassment'>Section 354A</option>
                                    <option id='Section-359' value='359' title='Kidnapping'>Section 359</option>
                                    <option id='Section-375' value='375' title='Rape'>Section 375</option>
                                    <option id='Section-376' value='376' title='Punishment for rape'>Section 376</option>
                                    <option id='Section-378' value='378' title='Theft'>Section 378</option>
                                    <option id='Section-383' value='383' title='Extortion'>Section 383</option>
                                    <option id='Section-390' value='390' title='Robbery'>Section 390</option>
                                    <option id='Section-403' value='403' title='Dishonest misappropriation of property'>Section 403</option>
                                    <option id='Section-405' value='405' title='Criminal breach of trust'>Section 405</option>
                                    <option id='Section-415' value='415' title='Cheating'>Section 415</option>
                                    <option id='Section-420' value='420' title='Cheating and dishonestly inducing delivery of property'>Section 420</option>
                                    <option id='Section-425' value='425' title='Mischief'>Section 425</option>
                                    <option id='Section-441' value='441' title='Criminal trespass'>Section 441</option>
                                    <option id='Section-463' value='463' title='Forgery'>Section 463</option>
                                    <option id='Section-494' value='494' title='Marrying again during lifetime of husband or wife'>Section 494</option>
                                    <option id='Section-497' value='497' title='Adultery (Decriminalized in 2018)'>Section 497</option>
                                    <option id='Section-498A' value='498A' title='Husband or relative of husband of a woman subjecting her to cruelty'>Section 498A</option>
                                    <option id='Section-499' value='499' title='Defamation'>Section 499</option>
                                    <option id='Section-503' value='503' title='Criminal intimidation'>Section 503</option>
                                    <option id='Section-509' value='509' title='Word, gesture or act intended to insult the modesty of a woman'>Section 509</option>
                                    <option id='Section-511' value='511' title='Punishment for attempting to commit offenses'>Section 511</option>



                                    {/* Add more sections based on the selected act */}
                                </select>
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
                        <button type="button" className="case-details-btn-next" onClick={handleSubmit}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CaseDetails;
