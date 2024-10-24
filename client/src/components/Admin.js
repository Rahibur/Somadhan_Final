import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import Navbar from './Layout/Navbar';

const Admin = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        // Get total revenue from localStorage
        const revenue = JSON.parse(localStorage.getItem('totalRevenue')) || 0;
        setTotalRevenue(revenue);
    }, []);

    return (
        <>
            <Navbar />

            <div className='admin-page'>
                <h1>Admin Dashboard</h1>
                <Card title="Total Revenue" style={{ width: 300 }}>
                    <p>Total Revenue from Purchases: ${totalRevenue}</p>
                </Card>
            </div>
        </>

    );
};

export default Admin;
