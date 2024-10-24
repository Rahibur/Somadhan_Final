import React, { useState, useEffect } from 'react';
import Navbar from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';

const Yearly_goal = () => {
    const initialFormState = {
        year: '',
        majorTargets: ['', '', '', '', '', ''],
        minorTargets: ['', '', '', '', '', ''],
        notes: ''
    };

    const [formData, setFormData] = useState([initialFormState]);

    useEffect(() => {
        // Load data from localStorage when the component mounts
        const savedData = JSON.parse(localStorage.getItem('yearlyGoals'));
        if (savedData) {
            setFormData(savedData);
        }
    }, []);

    const handleChange = (index, field, value) => {
        const newFormData = [...formData];
        newFormData[index] = { ...newFormData[index], [field]: value };
        setFormData(newFormData);
    };

    const handleAddForm = () => {
        setFormData([...formData, initialFormState]);
    };

    const handleDeleteForm = (index) => {
        const newFormData = [...formData];
        newFormData.splice(index, 1);
        setFormData(newFormData);
    };

    const handleSave = () => {
        localStorage.setItem('yearlyGoals', JSON.stringify(formData));
        alert('Data saved successfully!');
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="animate-text_2">Create your Yearly Goals with our prebuilt template</div>
            <div className="container_3 mt-4">
                <h2 className="planner-title mb-4">Yearly Goals Planner</h2>
                {formData.map((data, index) => (
                    <div key={index} className="row form-instance">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor={`yearInput_${index}`}><b>Year</b></label>
                                <input
                                    id={`yearInput_${index}`}
                                    type="text"
                                    className="form-control"
                                    value={data.year}
                                    onChange={(e) => handleChange(index, 'year', e.target.value)}
                                    placeholder="Enter year"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`majorTargetsInput_${index}`}><b>Major Targets</b></label>
                                {data.majorTargets.map((target, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        className="form-control mb-2"
                                        value={target}
                                        onChange={(e) => handleChange(index, 'majorTargets', [...data.majorTargets.slice(0, idx), e.target.value, ...data.majorTargets.slice(idx + 1)])}
                                        placeholder={`Major Target ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor={`minorTargetsInput_${index}`}><b>Minor Targets</b></label>
                                {data.minorTargets.map((target, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        className="form-control mb-2"
                                        value={target}
                                        onChange={(e) => handleChange(index, 'minorTargets', [...data.minorTargets.slice(0, idx), e.target.value, ...data.minorTargets.slice(idx + 1)])}
                                        placeholder={`Minor Target ${idx + 1}`}
                                    />
                                ))}
                            </div>
                            <div className="form-group">
                                <label htmlFor={`notesTextarea_${index}`}><b>Notes</b></label>
                                <textarea
                                    id={`notesTextarea_${index}`}
                                    className="form-control"
                                    value={data.notes}
                                    onChange={(e) => handleChange(index, 'notes', e.target.value)}
                                    rows="8"
                                    placeholder="Enter your notes here"
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

export default Yearly_goal;
