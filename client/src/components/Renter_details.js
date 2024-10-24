import React, { useState, useEffect } from 'react';
import Navbar from './Layout/Navbar';  // Navbar component
import Sidebar from './Layout/Sidebar';  // Sidebar component

const RenterDetails = () => {
    // Initial form state with all the fields for renter details
    const initialFormState = {
        renterName: '',               // Renter's name
        occupation: '',               // Renter's occupation
        contactNumber: '',            // Renter's contact number
        familySize: '',               // Family size of the renter
        picture: null,                // Picture file (null by default)
        picturePreview: '',           // URL to preview the uploaded picture
        nidOrBirthCertificate: '',    // NID/Birth certificate number
        rentedFlat: '',               // Rented flat details
        fatherName: '',               // Father's name
        motherName: '',               // Mother's name
        village: ''                   // Village name
    };

    // State to manage the form data as an array (in case of multiple forms)
    const [formData, setFormData] = useState([initialFormState]);

    useEffect(() => {
        // useEffect to load saved data from localStorage when component mounts
        const savedData = JSON.parse(localStorage.getItem('renterDetails'));
        if (savedData) {
            setFormData(savedData);  // If data exists, populate the form with saved data
        }
    }, []); 

    // Function to handle changes in form inputs
    const handleChange = (index, field, value) => {
        const newFormData = [...formData];  // Copy current form data array
        newFormData[index] = { ...newFormData[index], [field]: value };  // Update specific field of the form
        setFormData(newFormData);  // Update the form state with new data
    };

    // Function to handle file changes (picture upload)
    const handleFileChange = (index, e) => {
        const file = e.target.files[0];  // Get the uploaded file
        const reader = new FileReader();

        reader.onloadend = () => {
            const newFormData = [...formData];
            // Update the picture and its preview (base64 URL) in the form data
            newFormData[index] = {
                ...newFormData[index],
                picture: file,
                picturePreview: reader.result
            };
            setFormData(newFormData);
        };

        if (file) {
            reader.readAsDataURL(file);  // Read the file as a Data URL for preview
        }
    };

    // Function to add a new form
    const handleAddForm = () => {
        setFormData([...formData, initialFormState]);  // Append a new form instance
    };

    // Function to delete a form at a specific index
    const handleDeleteForm = (index) => {
        const newFormData = [...formData];
        newFormData.splice(index, 1);  // Remove the form at the given index
        setFormData(newFormData);  // Update the form data state
    };

    // Function to save form data to localStorage
    const handleSave = () => {
        localStorage.setItem('renterDetails', JSON.stringify(formData));  // Save the data as a JSON string
        alert('Data saved successfully!');  // Notify the user
    };

    return (
        <>
            {/* Render Navbar and Sidebar components */}
            <Navbar />
            <Sidebar />

            {/* Main container for renter details form */}
            <div className="renter-details-container mt-4">
                {formData.map((data, index) => (
                    // Loop through the form data array to generate multiple forms
                    <div key={index} className="form-instance">
                        <h2 className="planner-title mb-4">Renter Details Form</h2>
                        <div className="row">
                            {/* Left side of the form */}
                            <div className="col-md-6">
                                {/* Picture upload section */}
                                <div className="form-group">
                                    <label htmlFor={`picture_${index}`}><b>Upload Picture</b></label>
                                    <input
                                        id={`picture_${index}`}
                                        type="file"
                                        className="form-control-file"
                                        onChange={(e) => handleFileChange(index, e)}  // Call file change handler
                                    />
                                </div>
                                {data.picturePreview && (
                                    // If picture preview is available, display it
                                    <div className="mt-2">
                                        <img
                                            src={data.picturePreview}
                                            alt="Uploaded"
                                            style={{ width: '300px', height: '300px' }}  // Style the picture preview
                                        />
                                    </div>
                                )}
                                {/* Renter's name input */}
                                <div className="form-group">
                                    <label htmlFor={`renterName_${index}`}><b>Renter Name</b></label>
                                    <input
                                        id={`renterName_${index}`}
                                        type="text"
                                        className="form-control"
                                        value={data.renterName}
                                        onChange={(e) => handleChange(index, 'renterName', e.target.value)}  // Update state on change
                                        placeholder="Enter renter's name"
                                    />
                                </div>
                                {/* Similar inputs for occupation, contact number, and NID/Birth Certificate */}
                                <div className="form-group">
                                    <label htmlFor={`occupation_${index}`}><b>Occupation</b></label>
                                    <input
                                        id={`occupation_${index}`}
                                        type="text"
                                        className="form-control"
                                        value={data.occupation}
                                        onChange={(e) => handleChange(index, 'occupation', e.target.value)}
                                        placeholder="Enter occupation"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={`contactNumber_${index}`}><b>Contact Number</b></label>
                                    <input
                                        id={`contactNumber_${index}`}
                                        type="text"
                                        className="form-control"
                                        value={data.contactNumber}
                                        onChange={(e) => handleChange(index, 'contactNumber', e.target.value)}
                                        placeholder="Enter contact number"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={`nidOrBirthCertificate_${index}`}><b>NID / Birth Certificate Number</b></label>
                                    <input
                                        id={`nidOrBirthCertificate_${index}`}
                                        type="text"
                                        className="form-control"
                                        value={data.nidOrBirthCertificate}
                                        onChange={(e) => handleChange(index, 'nidOrBirthCertificate', e.target.value)}
                                        placeholder="Enter NID or Birth Certificate number"
                                    />
                                </div>
                            </div>

                            {/* Right side of the form */}
                            <div className="col-md-6">
                                {/* Inputs for family size, rented flat, and parent's names */}
                                <div className="form-group">
                                    <label htmlFor={`familySize_${index}`}><b>Family Size</b></label>
                                    <input
                                        id={`familySize_${index}`}
                                        type="text"
                                        className="form-control"
                                        value={data.familySize}
                                        onChange={(e) => handleChange(index, 'familySize', e.target.value)}
                                        placeholder="Enter family size"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={`rentedFlat_${index}`}><b>Rented Flat</b></label>
                                    <input
                                        id={`rentedFlat_${index}`}
                                        type="text"
                                        className="form-control"
                                        value={data.rentedFlat}
                                        onChange={(e) => handleChange(index, 'rentedFlat', e.target.value)}
                                        placeholder="Enter rented flat details"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={`fatherName_${index}`}><b>Father's Name</b></label>
                                    <input
                                        id={`fatherName_${index}`}
                                        type="text"
                                        className="form-control"
                                        value={data.fatherName}
                                        onChange={(e) => handleChange(index, 'fatherName', e.target.value)}
                                        placeholder="Enter father's name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={`motherName_${index}`}><b>Mother's Name</b></label>
                                    <input
                                        id={`motherName_${index}`}
                                        type="text"
                                        className="form-control"
                                        value={data.motherName}
                                        onChange={(e) => handleChange(index, 'motherName', e.target.value)}
                                        placeholder="Enter mother's name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={`village_${index}`}><b>Village</b></label>
                                    <input
                                        id={`village_${index}`}
                                        type="text"
                                        className="form-control"
                                        value={data.village}
                                        onChange={(e) => handleChange(index, 'village', e.target.value)}
                                        placeholder="Enter village"
                                    />
                                </div>
                                {/* Button to delete a form */}
                                <button className="btn btn-danger btn-delete" onClick={() => handleDeleteForm(index)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Buttons to add new form and save all forms */}
                <button className="btn btn-success btn-add" onClick={handleAddForm}>Add New Form</button>
                <button className="btn btn-success btn-save" onClick={handleSave}>Save All</button>
            </div>
        </>
    );
};

export default RenterDetails;
