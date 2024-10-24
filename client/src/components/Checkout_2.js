import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Checkout_2 = () => {
    const { goalType } = useParams(); // Get the goal type (yearly, monthly, daily) from URL
    const [cardNumber, setCardNumber] = useState('');
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const navigate = useNavigate();

    // Check if the user has already purchased the goal
    useEffect(() => {
        const purchased = localStorage.getItem(`${goalType}Purchased`);
        if (purchased === 'true') {
            if (goalType === 'yearly') {
                navigate('/yearly');
            } else if (goalType === 'monthly') {
                navigate('/monthly');
            } else if (goalType === 'daily') {
                navigate('/daily');
            }
        }
    }, [goalType, navigate]);

    const handlePurchase = () => {
        if (cardNumber.length < 12) {
            alert("Please enter a valid card number");
            return;
        }
    
        // Simulate storing that the user purchased this specific goal type
        localStorage.setItem(`${goalType}Purchased`, 'true');
    
        // Add the purchase to localStorage for revenue tracking
        let totalRevenue = JSON.parse(localStorage.getItem('totalRevenue')) || 0;
        totalRevenue += 10; // Add $10 for this purchase
        localStorage.setItem('totalRevenue', JSON.stringify(totalRevenue));
    
        setPurchaseComplete(true);
    
        // Redirect to the respective goal page after purchase
        setTimeout(() => {
            if (goalType === 'yearly') {
                navigate('/yearly');
            } else if (goalType === 'monthly') {
                navigate('/monthly');
            } else if (goalType === 'daily') {
                navigate('/daily');
            }
        }, 1000);
    };
    

    return (
        <div className="checkout-container">
            <div className="card shadow checkout-box p-4">
                <h2 className="text-center mb-4">Checkout</h2>
                <p className="text-center mb-4">
                    You are purchasing: <strong>{goalType.charAt(0).toUpperCase() + goalType.slice(1)} Goals</strong> for $10
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

export default Checkout_2;
