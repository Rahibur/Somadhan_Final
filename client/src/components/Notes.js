import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';

const Notes = () => {
    // Function to check if a section is purchased
    const isPurchased = (section) => localStorage.getItem(`${section}Purchased`) === 'true';

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="animate-text_1"> Create your Housing Rental Management </div>
            <div className="center-container">

                {/* Renter Details Section */}
                {!isPurchased('renter') && (
                    <div className="navlink rent">
                        <NavLink to="/checkout_3/renter" className='renter_detail'>
                            Renter Details purchase $100
                        </NavLink>
                    </div>
                )}
                {isPurchased('renter') && (
                    <div className="navlink rent">
                        <NavLink to="/renter" className='renter_detail'>
                            Renter Details
                        </NavLink>
                    </div>
                )}

                {/* Manage Rental Section */}
                {!isPurchased('management') && (
                    <div className="navlink management_1">
                        <NavLink to="/checkout_3/management" className='management'>
                            Manage Rental purchase $100
                        </NavLink>
                    </div>
                )}
                {isPurchased('management') && (
                    <div className="navlink management_1">
                        <NavLink to="/management" className='management'>
                            Manage Rental
                        </NavLink>
                    </div>
                )}

            </div>
        </>
    );
};

export default Notes;
