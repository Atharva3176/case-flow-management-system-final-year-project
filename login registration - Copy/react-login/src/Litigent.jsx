import React, { useState } from 'react';
import Navinbar from './Navinbar';
import './Lit.css'; // Ensure this file includes your updated CSS
import { useNavigate } from 'react-router-dom';

const Litigent = () => {
  const [formType, setFormType] = useState('Petitioner'); // To toggle between Petitioner and Respondent
  const [name, setName] = useState(''); // Name of Petitioner/Respondent
  const [age, setAge] = useState(''); // Age of Petitioner/Respondent
  const [relation, setRelation] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [caste, setCaste] = useState('');
  const [extraPetitionerCount, setExtraPetitionerCount] = useState(0); // Extra Petitioner Count
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [taluka, setTaluka] = useState('');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [otherInfo, setOtherInfo] = useState(false);
  const [complainantName, setComplainantName] = useState('');
  const [legalHeirName, setLegalHeirName] = useState('');
  const [complainantAddress, setComplainantAddress] = useState('');
  const [complainantOccupation, setComplainantOccupation] = useState('');
  const [efilingNumber, setEfilingNumber] = useState(''); // New state for e-filing number
  const [caseType, setCaseType] = useState(''); // New state for case type
  const [establishment, setEstablishment] = useState(''); // New state for establishment
  const [displayInfo, setDisplayInfo] = useState(false); // State to control when to display info
  const [respondentName, setRespondentName] = useState(''); // New state for Respondent name

  const [formData, setFormData] = useState({state: '', district: ''});

  const navigate = useNavigate(); // Initialize useNavigate
  const generatedEfilingNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
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
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };




  
  const handleUpdate = async (e) => {
    e.preventDefault(); // Move e.preventDefault() to the top
    const caseFilingData = {
      formType,
      name,
      age,
      relation,
      dob,
      gender,
      caste,
      extraPetitionerCount,
      address,
      email,
      occupation,
      mobileNo,
      pinCode,
      state,
      taluka,
      district:formData.district,
      village,
      otherInfo,
      complainantName,
      legalHeirName,
      complainantAddress,
      complainantOccupation,
      efilingNumber,
      caseType,
      establishment
    };
  
    try {
      const response = await fetch('http://localhost:3001/api/litigent/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(caseFilingData)
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Case updated successfully');
        console.log(result);
      } else {
        alert('Error filing case');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error filing case');
    }

    try {
        const response = await fetch('http://localhost:3001/api/caseDetails');
        const data = await response.json();

        if (response.ok) {
            // Assuming data is an array of objects with establishment and caseType
            
            if (data.length > 0) {
                //const generatedEfilingNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
                setEfilingNumber(generatedEfilingNumber); // Set the generated e-filing number
                const caseDetail = data[0]; // Assuming you want the first case detail
                setEstablishment(caseDetail.establishment);
                setCaseType(caseDetail.caseType);
                
                // Default to 'N/A' if efilingNumber is not available
                setEfilingNumber(caseDetail.efilingNumber || generatedEfilingNumber);

                setDisplayInfo(true); // Set displayInfo to true to show information
                
                // Alert user with caseType, establishment, and generated e-filing number
                alert(`Case Type: ${caseDetail.caseType}\nEstablishment: ${caseDetail.establishment}\nE-Filing Number: ${generatedEfilingNumber}`);
            } else {
                alert('No case details found'); // Handle the case where no details are found
            }
        } else {
            alert(data.message); // Show the error message from the server
        }
    } catch (error) {
        console.error('Error fetching case details:', error);
        alert('Error fetching case details');
    }
};
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const caseFilingData = {
      formType,
      name,
      age,
      relation,
      dob,
      gender,
      caste,
      extraPetitionerCount,
      address,
      email,
      occupation,
      mobileNo,
      pinCode,
      state,
      taluka,
      district:formData.district,
      village,
      otherInfo,
      complainantName,
      legalHeirName,
      complainantAddress,
      complainantOccupation,
      efilingNumber,
      caseType,
      establishment
    };
  
    try {
      const response = await fetch('http://localhost:3001/api/litigent/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(caseFilingData)
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Case submitted successfully');
        console.log(result);
        navigate('/case-details');
      } else {
        alert('Error filing case');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error filing case');
    }
  };
  

  return (
    <div>
      <Navinbar />
      {displayInfo && (
          <div className="efiling-info">
            <h2>Establishment: {establishment}</h2>
            <h3>E-Filing Number: {efilingNumber}</h3>
            <h3>Case Type: {caseType}</h3>
            <p><b>{formType === 'Petitioner' ? `${name} vs ${respondentName}` : `${respondentName} vs ${name}`}</b></p>
          </div>
        )}
      <div className="litigent-container">
        <h2>Litigant Information</h2>

        {/* Radio buttons to toggle between Petitioner and Respondent, styled like Gender */}
        <div className="litigent-form-group">
          <label>Petitioner/Respondent Type *</label>
          <div className="litigent-radio-group">
            <label>
              <input
                type="radio"
                value="Petitioner"
                checked={formType === 'Petitioner'}
                onChange={() => setFormType('Petitioner')}
              />{' '}
              Petitioner
            </label>
            <label>
              <input
                type="radio"
                value="Respondent"
                checked={formType === 'Respondent'}
                onChange={() => setFormType('Respondent')}
              />{' '}
              Respondent
            </label>
          </div>
        </div>

        <form className="litigent-form" onSubmit={handleSubmit}>
          {/* Personal Details Section */}
          <div className="litigent-section">
            <h3>{formType} Personal Details</h3>

            {formType === 'Petitioner' && (
               <div className="litigent-form-group">
                 <label>petetioner Name *</label>
                 <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
            )}

            {formType === 'Respondent' && (
                <div className="litigent-form-group">
                  <label>Respondent Name *</label>
                  <input type="text" value={respondentName} onChange={(e) => setRespondentName(e.target.value)} required />
                </div>
            )}

            <div className="litigent-form-group">
              <label>Age *</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>

            <div className="litigent-form-group">
              <label>Relation</label>
              <select value={relation} onChange={(e) => setRelation(e.target.value)}>
                <option value="">Select Relation</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
              </select>
            </div>

            <div className="litigent-form-group">
              <label>Date of Birth *</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
            </div>

            <div className="litigent-form-group">
              <label>Gender *</label>
              <div className="litigent-radio-group">
                <label>
                  <input
                    type="radio"
                    value="Male"
                    checked={gender === 'Male'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    checked={gender === 'Female'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="Other"
                    checked={gender === 'Other'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Other
                </label>
              </div>
            </div>

            <div className="litigent-form-group">
              <label>Caste</label>
              <select value={caste} onChange={(e) => setCaste(e.target.value)}>
                <option value="">Select Caste</option>
                <option value="General">General</option>
                <option value="SC/ST">SC/ST</option>
              </select>
            </div>

            <div className="litigent-form-group">
              <label>Extra Petitioner Count</label>
              <input type="number" value={extraPetitionerCount} onChange={(e) => setExtraPetitionerCount(e.target.value)} />
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="litigent-section">
            <h3>Contact Details</h3>

            <div className="litigent-form-group">
              <label>Address *</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>

            <div className="litigent-form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="litigent-form-group">
              <label>Occupation</label>
              <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
            </div>

            <div className="litigent-form-group">
              <label>Mobile Number *</label>
              <input type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />
            </div>

            <div className="litigent-form-group">
              <label>Pin Code</label>
              <input type="text" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
            </div>
          </div>

          {/* State Information Section */}
          <div className="litigent-section">
            <h3>State Information</h3>

            <div className="litigent-form-group">
              <label>State</label>
              <select name="state" value={formData.state} onChange={handleChange} required>
              {/* <option value="">-- Select State --</option> */}
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

            <div className="litigent-form-group">
              <label>Taluka</label>
              <select value={taluka} onChange={(e) => setTaluka(e.target.value)}>
                <option value="">Select Taluka</option>
                <option value="Baramati">Baramati</option>
                {/* Add more options */}
              </select>
            </div>

            <div className="litigent-form-group">
              <label>District</label>
              <select name="district" value={formData.district} onChange={handleChange} required disabled={!formData.state}>
              <option value="">-- Select District --</option>
              {formData.state && stateDistricts[formData.state]?.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}

              </select>
            </div>

            <div className="litigent-form-group">
              <label>Village</label>
              <select value={village} onChange={(e) => setVillage(e.target.value)}>
                <option value="">Select Village</option>
                {/* Add more options */}
              </select>
            </div>
          </div>

          {/* Marathi Section: Other Information */}
          <div className="litigent-section">
            <h3>Other Information</h3>
            <label>
              <input
                type="checkbox"
                checked={otherInfo}
                onChange={(e) => setOtherInfo(!otherInfo)}
              />
              इतर माहिती
            </label>
          </div>

          {/* Marathi Form Fields */}
          <div className="litigent-form-group">
            <label>फिर्यादी/आरोपी *</label>
            <input type="text" value={complainantName} onChange={(e) => setComplainantName(e.target.value)} />
          </div>

          <div className="litigent-form-group">
            <label>वडील/आई/पति चे नाव *</label>
            <input type="text" value={legalHeirName} onChange={(e) => setLegalHeirName(e.target.value)} />
          </div>

          <div className="litigent-form-group">
            <label>पत्ता *</label>
            <input type="text" value={complainantAddress} onChange={(e) => setComplainantAddress(e.target.value)} />
          </div>

          <div className="litigent-form-group">
            <label>व्यवसाय *</label>
            <input type="text" value={complainantOccupation} onChange={(e) => setComplainantOccupation(e.target.value)} />
          </div>

          {/* Buttons Section */}
          <div className="litigent-form-actions">
            <button type="submit" className="litigent-btn-submit" onClick={handleSubmit}>
              Submit
            </button>
            <button type="reset" className="litigent-btn-reset">
              Reset
            </button>
            <button type="button" className="litigent-btn-update" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Litigent;
