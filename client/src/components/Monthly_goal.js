import React, { useState, useEffect } from 'react'; // Importing necessary React hooks
import Navbar from './Layout/Navbar'; // Importing Navbar component
import Sidebar from './Layout/Sidebar'; // Importing Sidebar component

const Monthly_goals = () => {
    // Initial state for the form data
    const initialFormState = {
        month: '', // Field for the month
        monthlyFocus: '', // Field for the focus of the month
        topThings: ['', '', ''], // Array for the top three things
        specialDates: ['', '', '', ''], // Array for special dates
        homeKeepingTasks: ['', '', '', ''], // Array for homekeeping tasks
        goalsOfTheMonth: ['', '', '', ''], // Array for goals of the month
        notes: '' // Field for notes
    };

    const [formData, setFormData] = useState([initialFormState]); // State to hold form data

    useEffect(() => {
        // Load data from localStorage when the component mounts
        const savedData = JSON.parse(localStorage.getItem('monthlyPlans'));
        if (savedData) {
            setFormData(savedData); // Set saved data to formData state
        }
    }, []);

    // Function to handle input changes
    const handleChange = (index, field, value) => {
        const newFormData = [...formData]; // Create a copy of formData
        newFormData[index] = { ...newFormData[index], [field]: value }; // Update specific field
        setFormData(newFormData); // Update state
    };

    // Function to add a new form
    const handleAddForm = () => {
        setFormData([...formData, initialFormState]); // Add a new form using initial state
    };

    // Function to delete a form at the specified index
    const handleDeleteForm = (index) => {
        const newFormData = [...formData]; // Create a copy of formData
        newFormData.splice(index, 1); // Remove the form at the specified index
        setFormData(newFormData); // Update state
    };

    // Function to save form data to localStorage
    const handleSave = () => {
        localStorage.setItem('monthlyPlans', JSON.stringify(formData)); // Save data to localStorage
        alert('Data saved successfully!'); // Alert user that data has been saved
    };

    return (
        <>
            <Navbar /> 
            <Sidebar /> 
            <div className="animate-text_2"> Create your Monthly plan with our prebuild template</div>
            <div className="container_3 mt-4">
                <h2 className="planner-title mb-4">Monthly Planner</h2>
                {formData.map((data, index) => (
                    <div key={index} className="row form-instance">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor={`monthInput_${index}`}><b>Month</b></label>
                                <input
                                    id={`monthInput_${index}`}
                                    type="text"
                                    className="form-control"
                                    value={data.month} // Bind input value to state
                                    onChange={(e) => handleChange(index, 'month', e.target.value)} // Handle change
                                    placeholder="Enter month" // Placeholder text
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`monthlyFocusInput_${index}`}><b>Monthly Focus</b></label>
                                <input
                                    id={`monthlyFocusInput_${index}`}
                                    type="text"
                                    className="form-control"
                                    value={data.monthlyFocus} // Bind input value to state
                                    onChange={(e) => handleChange(index, 'monthlyFocus', e.target.value)} // Handle change
                                    placeholder="Enter focus for the month" // Placeholder text
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`topThingsInput_${index}`}><b>Top Three Things</b></label>
                                {data.topThings.map((thing, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        className="form-control mb-2"
                                        value={thing} // Bind input value to state
                                        onChange={(e) => handleChange(index, 'topThings', [...data.topThings.slice(0, idx), e.target.value, ...data.topThings.slice(idx + 1)])} // Update topThings array
                                        placeholder={`Top ${idx + 1}`} // Placeholder text
                                    />
                                ))}
                            </div>
                            <div className="form-group">
                                <label htmlFor={`specialDatesInput_${index}`}><b>Special Dates</b></label>
                                {data.specialDates.map((date, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        className="form-control mb-2"
                                        value={date} // Bind input value to state
                                        onChange={(e) => handleChange(index, 'specialDates', [...data.specialDates.slice(0, idx), e.target.value, ...data.specialDates.slice(idx + 1)])} // Update specialDates array
                                        placeholder={`Date ${idx + 1}`} // Placeholder text
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor={`homeKeepingTasksInput_${index}`}><b>Home Keeping Tasks</b></label>
                                {data.homeKeepingTasks.map((task, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        className="form-control mb-2"
                                        value={task} // Bind input value to state
                                        onChange={(e) => handleChange(index, 'homeKeepingTasks', [...data.homeKeepingTasks.slice(0, idx), e.target.value, ...data.homeKeepingTasks.slice(idx + 1)])} // Update homeKeepingTasks array
                                        placeholder={`Task ${idx + 1}`} // Placeholder text
                                    />
                                ))}
                            </div>
                            <div className="form-group">
                                <label htmlFor={`goalsOfTheMonthInput_${index}`}><b>Goals of the Month</b></label>
                                {data.goalsOfTheMonth.map((goal, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        className="form-control mb-2"
                                        value={goal} // Bind input value to state
                                        onChange={(e) => handleChange(index, 'goalsOfTheMonth', [...data.goalsOfTheMonth.slice(0, idx), e.target.value, ...data.goalsOfTheMonth.slice(idx + 1)])} // Update goalsOfTheMonth array
                                        placeholder={`Goal ${idx + 1}`} // Placeholder text
                                    />
                                ))}
                            </div>
                            <div className="form-group">
                                <label htmlFor={`notesTextarea_${index}`}><b>Notes</b></label>
                                <textarea
                                    id={`notesTextarea_${index}`}
                                    className="form-control"
                                    value={data.notes} // Bind textarea value to state
                                    onChange={(e) => handleChange(index, 'notes', e.target.value)} // Handle change
                                    rows="8" // Set number of rows
                                    placeholder="Enter your notes here" // Placeholder text
                                />
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

export default Monthly_goals; // Exporting the component
