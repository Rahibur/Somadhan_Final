import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Checkout_3 = () => {
    const { sectionType } = useParams(); // Get the section type (renter, management) from URL
    const [cardNumber, setCardNumber] = useState('');
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const navigate = useNavigate();

    // Check if the user has already purchased the section
    useEffect(() => {
        const purchased = localStorage.getItem(`${sectionType}Purchased`);
        if (purchased === 'true') {
            if (sectionType === 'renter') {
                navigate('/renter');
            } else if (sectionType === 'management') {
                navigate('/management');
            }
        }
    }, [sectionType, navigate]);

    const handlePurchase = () => {
        if (cardNumber.length < 12) {
            alert("Please enter a valid card number");
            return;
        }

        // Simulate storing that the user purchased this specific section
        localStorage.setItem(`${sectionType}Purchased`, 'true');

        // Add the purchase to localStorage for revenue tracking
        let totalRevenue = JSON.parse(localStorage.getItem('totalRevenue')) || 0;
        totalRevenue += 10; // Add $10 for this purchase
        localStorage.setItem('totalRevenue', JSON.stringify(totalRevenue));

        setPurchaseComplete(true);

        // Redirect to the respective section page after purchase
        setTimeout(() => {
            if (sectionType === 'renter') {
                navigate('/renter');
            } else if (sectionType === 'management') {
                navigate('/management');
            }
        }, 1000);
    };

    return (
        <div className="checkout-container">
            <div className="card shadow checkout-box p-4">
                <h2 className="text-center mb-4">Checkout</h2>
                <p className="text-center mb-4">
                    You are purchasing: <strong>{sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} </strong> for $100
                </p>

                <div className="form-group mb-3">
                    <label htmlFor="cardNumber">Card Number (Demo):</label>
                    <input 
                        type="text" 
                        id="cardNumber" 
                        className="form-control" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Enter demo card number"
                    />
                </div>

                <button 
                    className="btn btn-primary w-100" 
                    onClick={handlePurchase}
                    disabled={purchaseComplete}
                >
                    {purchaseComplete ? "Purchase Complete!" : "Purchase"}
                </button>

                {purchaseComplete && <p className="text-success text-center mt-3">Thank you for your purchase!</p>}
            </div>
        </div>
    );
};

export default Checkout_3;
