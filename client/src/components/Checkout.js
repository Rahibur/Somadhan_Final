import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Checkout = () => {
    const { id } = useParams();
    const [cardNumber, setCardNumber] = useState('');
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const navigate = useNavigate();

    const handlePurchase = () => {
        if (cardNumber.length < 12) {
            alert("Please enter a valid card number");
            return;
        }
    
        // Mark the item as purchased in localStorage
        localStorage.setItem(`purchased_${id}`, "true");
    
        // Add the purchase to localStorage for revenue tracking
        let totalRevenue = JSON.parse(localStorage.getItem('totalRevenue')) || 0;
        totalRevenue += 20; // Add $20 for this purchase
        localStorage.setItem('totalRevenue', JSON.stringify(totalRevenue));
    
        // Simulate purchase completion
        setPurchaseComplete(true);
    
        // Redirect to the view page after purchase
        setTimeout(() => {
            navigate(`/view_2/${id}`);
        }, 1000);
    };
    

    return (
        <div className="checkout-container">
            <div className="card shadow checkout-box p-4">
                <h2 className="text-center mb-4">Checkout</h2>
                <p className="text-center mb-4">You're purchasing: <strong>Premium Format_3</strong> for $20</p>
                
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

export default Checkout;
