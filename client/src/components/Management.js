import React, { useState, useEffect } from 'react'; // Import necessary React hooks
import Navbar from './Layout/Navbar'; // Import Navbar component
import Sidebar from './Layout/Sidebar'; // Import Sidebar component

// ManagementTable component to manage individual tables
const ManagementTable = ({ tableIndex, tableData, setTableData, ownerName, setOwnerName, buildingAddress, setBuildingAddress, handleDeleteTable }) => {
    
    // Function to handle changes in table data fields
    const handleChange = (field, index, value) => {
        const newData = { ...tableData }; // Copy existing table data
        newData[field][index] = value; // Update the specific field and index
        setTableData(newData); // Update the state with the new data
    };

    // Function to add a new row to the table
    const handleAddRow = () => {
        const newData = { ...tableData }; // Copy existing table data
        Object.keys(newData).forEach(key => {
            newData[key].push(''); // Add an empty string for each column field
        });
        setTableData(newData); // Update the state with the new data
    };

    // Function to delete a specific row from the table
    const handleDeleteRow = (index) => {
        const newData = { ...tableData }; // Copy existing table data
        Object.keys(newData).forEach(key => {
            newData[key].splice(index, 1); // Remove the specific index from each column field
        });
        setTableData(newData); // Update the state with the new data
    };

    // Get the column headers from the table data keys
    const columnHeaders = Object.keys(tableData);

    return (
        <div className="table-container">
            {/* Input field for Owner Name */}
            <div className="form-group">
                <label>Owner Name:</label>
                <input
                    type="text"
                    className="form-control"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)} // Update owner name state
                />
            </div>

            {/* Input field for Building Address */}
            <div className="form-group">
                <label>Building Address:</label>
                <input
                    type="text"
                    className="form-control"
                    value={buildingAddress}
                    onChange={(e) => setBuildingAddress(e.target.value)} // Update building address state
                />
            </div>

            {/* Table for housing rental management */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Fields</th>
                        {/* Render column headers for each entry */}
                        {tableData.month.map((_, index) => (
                            <th key={index}>Entry {index + 1}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map over column headers and render rows */}
                    {columnHeaders.map((header, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{header.charAt(0).toUpperCase() + header.slice(1)}</td> {/* Capitalize first letter of header */}
                            {tableData[header].map((value, colIndex) => (
                                <td key={colIndex}>
                                    {/* Conditional rendering for textarea or input */}
                                    {header === 'otherBills' ? (
                                        <textarea
                                            className="form-control"
                                            value={value}
                                            onChange={(e) => handleChange(header, colIndex, e.target.value)} // Handle change in text area
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={value}
                                            onChange={(e) => handleChange(header, colIndex, e.target.value)} // Handle change in input field
                                        />
                                    )}
                                </td>
                            ))}
                            <td>
                                {/* Render delete row button only for the first row */}
                                {rowIndex === 0 && (
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteRow(rowIndex)} // Handle delete row action
                                    >
                                        Delete Row
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        {/* Add row button */}
                        <td colSpan={tableData.month.length + 2}>
                            <button className="btn btn-success mr-2" onClick={handleAddRow}>Add Row</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
            {/* Delete table button */}
            <button className="btn btn-danger mb-4" onClick={() => handleDeleteTable(tableIndex)}>Delete Table</button>
        </div>
    );
};

// Management component to handle the overall management of tables
const Management = () => {
    // Initial state for columns in the table
    const initialColumnState = {
        month: ['', '', '', ''],
        flatNo: ['', '', '', ''],
        renterName: ['', '', '', ''],
        flatBill: ['', '', '', ''],
        otherBills: ['', '', '', ''],
        total: ['', '', '', ''],
        due: ['', '', '', ''],
        paid: ['', '', '', '']
    };

    // Initial state for table data, owner name, and building address
    const initialTableState = {
        ownerName: '',
        buildingAddress: '',
        tableData: initialColumnState
    };

    // State to manage multiple tables
    const [tables, setTables] = useState([initialTableState]);

    // Load tables from local storage when the component is first mounted
    useEffect(() => {
        const savedTables = JSON.parse(localStorage.getItem('tables'));
        if (savedTables) setTables(savedTables); // Update state if saved tables exist
    }, []);

    // Function to save the tables data to local storage
    const handleSave = () => {
        localStorage.setItem('tables', JSON.stringify(tables)); // Save tables to local storage
        alert('Data saved successfully!');
    };

    // Function to add a new table
    const handleAddTable = () => {
        setTables([...tables, { ...initialTableState }]); // Add new table to the state
    };

    // Function to update table data
    const handleTableDataChange = (index, newData) => {
        const newTables = [...tables]; // Copy existing tables
        newTables[index] = { ...newTables[index], tableData: newData }; // Update the specific table's data
        setTables(newTables); // Update the state with the new tables
    };

    // Function to update owner name
    const handleOwnerNameChange = (index, value) => {
        const newTables = [...tables]; // Copy existing tables
        newTables[index] = { ...newTables[index], ownerName: value }; // Update the specific table's owner name
        setTables(newTables); // Update the state with the new tables
    };

    // Function to update building address
    const handleBuildingAddressChange = (index, value) => {
        const newTables = [...tables]; // Copy existing tables
        newTables[index] = { ...newTables[index], buildingAddress: value }; // Update the specific table's building address
        setTables(newTables); // Update the state with the new tables
    };

    // Function to delete a specific table
    const handleDeleteTable = (index) => {
        const newTables = [...tables]; // Copy existing tables
        newTables.splice(index, 1); // Remove the table at the specific index
        setTables(newTables); // Update the state with the new tables
    };

    return (
        <>
            <Navbar /> {/* Navbar component */}
            <Sidebar /> {/* Sidebar component */}
            <div className="management-container mt-4">
                <h2 className="planner-title mb-4">Housing Rental Management</h2> {/* Page title */}
                
                {/* Map over tables and render ManagementTable components */}
                {tables.map((table, index) => (
                    <ManagementTable
                        key={index}
                        tableIndex={index}
                        tableData={table.tableData}
                        setTableData={(newData) => handleTableDataChange(index, newData)}
                        ownerName={table.ownerName}
                        setOwnerName={(value) => handleOwnerNameChange(index, value)}
                        buildingAddress={table.buildingAddress}
                        setBuildingAddress={(value) => handleBuildingAddressChange(index, value)}
                        handleDeleteTable={handleDeleteTable}
                    />
                ))}

                {/* Add new table button */}
                <button className="btn btn-success mr-2" onClick={handleAddTable}>Add Table</button>

                {/* Save tables button */}
                <button className="btn btn-success" onClick={handleSave}>Save</button>
            </div>
        </>
    );
};

export default Management;
