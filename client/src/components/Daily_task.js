import React, { useState, useEffect } from 'react'; // Import necessary hooks and libraries
import Navbar from './Layout/Navbar'; // Import Navbar component
import Sidebar from './Layout/Sidebar'; // Import Sidebar component

const Daily_goals = () => {
    // Define the initial state of the form
    const initialFormState = {
        day: '', // Initially as a single string for the day
        importantUrgent: ['', '', '', '', '', ''], // Array for important and urgent tasks
        notImportantUrgent: ['', '', '', '', '', ''], // Array for not important but urgent tasks
        importantNotUrgent: ['', '', '', '', '', ''], // Array for important but not urgent tasks
        notImportantNotUrgent: ['', '', '', '', '', ''] // Array for not important and not urgent tasks
    };

    // State to manage form data, initialized with one form
    const [formData, setFormData] = useState([initialFormState]);

    useEffect(() => {
        // Load saved data from localStorage when the component mounts
        const savedData = JSON.parse(localStorage.getItem('dailyGoals'));
        if (savedData) {
            setFormData(savedData); // Set form data to saved data
        }
    }, []);

    // Function to handle changes in form fields
    const handleChange = (index, field, innerIndex, value) => {
        const newFormData = [...formData]; // Create a copy of formData
        if (field === 'day') {
            newFormData[index][field] = value; // Handle the 'day' field separately
        } else {
            newFormData[index][field][innerIndex] = value; // Update the appropriate field in the form data
        }
        setFormData(newFormData); // Update the formData state
    };

    // Function to add a new form instance
    const handleAddForm = () => {
        setFormData([...formData, initialFormState]); // Add a new initial form state to the existing forms
    };

    // Function to delete a specific form instance
    const handleDeleteForm = (index) => {
        const newFormData = [...formData]; // Create a copy of formData
        newFormData.splice(index, 1); // Remove the form at the specified index
        setFormData(newFormData); // Update the formData state
    };

    // Function to save the form data to localStorage
    const handleSave = () => {
        localStorage.setItem('dailyGoals', JSON.stringify(formData)); // Save formData to localStorage
        alert('Data saved successfully!'); // Notify the user that data is saved
    };

    return (
        <>
            <Navbar /> 
            <Sidebar /> 
            <div className="animate-text_2">Create your Daily Goals with our prebuilt template</div>
            <div className="container_3 mt-4">
                <h2 className="planner-title mb-4">Daily Tasks Planner</h2>
                {formData.map((data, index) => ( // Map through each form instance in formData
                    <div key={index} className="row form-instance">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor={`dayInput_${index}`}><b>Day</b></label>
                                <input
                                    id={`dayInput_${index}`} // Unique ID for the input field
                                    type="text"
                                    className="form-control"
                                    value={data.day} // Bind the input value to the state
                                    onChange={(e) => handleChange(index, 'day', 0, e.target.value)} // Handle change
                                    placeholder="Enter day" // Placeholder text for the input
                                />
                            </div>
                            <div className="form-group">
                                <label><b>Important + Urgent</b></label>
                                {data.importantUrgent.map((item, idx) => ( // Map through importantUrgent tasks
                                    <input
                                        key={idx}
                                        type="text"
                                        className="form-control mb-2"
                                        value={item} // Bind input value to the task
                                        onChange={(e) => handleChange(index, 'importantUrgent', idx, e.target.value)} // Handle change
                                        placeholder={`Task ${idx + 1}`} // Placeholder text for each task
                                    />
                                ))}
                            </div>
                            <div className="form-group">
                                <label><b>Not Important + Urgent</b></label>
                                {data.notImportantUrgent.map((item, idx) => ( // Map through notImportantUrgent tasks
                                    <input
                                        key={idx}
                                        type="text"
                                        className="form-control mb-2"
                                        value={item} // Bind input value to the task
                                        onChange={(e) => handleChange(index, 'notImportantUrgent', idx, e.target.value)} // Handle change
                                        placeholder={`Task ${idx + 1}`} // Placeholder text for each task
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label><b>Important + Not Urgent</b></label>
                                {data.importantNotUrgent.map((item, idx) => ( // Map through importantNotUrgent tasks
                                    <input
                                        key={idx}
                                        type="text"
                                        className="form-control mb-2"
                                        value={item} // Bind input value to the task
                                        onChange={(e) => handleChange(index, 'importantNotUrgent', idx, e.target.value)} // Handle change
                                        placeholder={`Task ${idx + 1}`} // Placeholder text for each task
                                    />
                                ))}
                            </div>
                            <div className="form-group">
                                <label><b>Not Important + Not Urgent</b></label>
                                {data.notImportantNotUrgent.map((item, idx) => ( // Map through notImportantNotUrgent tasks
                                    <input
                                        key={idx}
                                        type="text"
                                        className="form-control mb-2"
                                        value={item} // Bind input value to the task
                                        onChange={(e) => handleChange(index, 'notImportantNotUrgent', idx, e.target.value)} // Handle change
                                        placeholder={`Task ${idx + 1}`} // Placeholder text for each task
                                    />
                                ))}
                            </div>
                            <button className="btn btn-danger btn-delete" onClick={() => handleDeleteForm(index)}>Delete</button> 
                        </div>
                    </div>
                ))}
                <button className="btn btn-success btn-add" onClick={handleAddForm}>Add Form</button> 
                <button className="btn btn-success btn-save" onClick={handleSave}>Save</button> 
            </div>
        </>
    );
};

export default Daily_goals; // Export the Daily_goals component
