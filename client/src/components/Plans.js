import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';

const Plans = () => {
    // Function to check if a goal is purchased
    const isPurchased = (goalType) => localStorage.getItem(`${goalType}Purchased`) === 'true';

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="animate-text_1"> Create your Yearly, Monthly, and Daily Task planner </div>
            <div className="center-container">
                {!isPurchased('yearly') && (
                    <div className="navlink red">
                        <NavLink to="/checkout_2/yearly" className='yearly_goal'>
                            Yearly goals purchase $10
                        </NavLink>
                    </div>
                )}
                {isPurchased('yearly') && (
                    <div className="navlink red">
                        <NavLink to="/yearly" className='yearly_goal'>
                            Yearly goals
                        </NavLink>
                    </div>
                )}
                {!isPurchased('monthly') && (
                    <div className="navlink blue">
                        <NavLink to="/checkout_2/monthly" className='monthly_goal'>
                            Monthly goals purchase $10
                        </NavLink>
                    </div>
                )}
                {isPurchased('monthly') && (
                    <div className="navlink blue">
                        <NavLink to="/monthly" className='monthly_goal'>
                            Monthly goals
                        </NavLink>
                    </div>
                )}
                {!isPurchased('daily') && (
                    <div className="navlink green">
                        <NavLink to="/checkout_2/daily" className='daily_task'>
                            Daily task purchase $10
                        </NavLink>
                    </div>
                )}
                {isPurchased('daily') && (
                    <div className="navlink green">
                        <NavLink to="/daily" className='daily_task'>
                            Daily task
                        </NavLink>
                    </div>
                )}
            </div>
        </>
    );
};

export default Plans;
