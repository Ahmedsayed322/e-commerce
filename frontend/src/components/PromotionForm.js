import React, { useState } from 'react';
import axios from 'axios';

function PromotionForm() {
    const [promotionData, setPromotionData] = useState({});

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/promotions', promotionData);
            console.log('Promotion created:', response.data);
        } catch (error) {
            console.error('Error creating promotion:', error);
        }
    };

    const handleInputChange = (e) => {
        setPromotionData({ ...promotionData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Create Promotion</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={handleInputChange} />
                <input type="text" name="description" placeholder="Description" onChange={handleInputChange} />
                <input type="number" name="discountPercentage" placeholder="Discount Percentage" onChange={handleInputChange} />
                <input type="date" name="startDate" placeholder="Start Date" onChange={handleInputChange} />
                <input type="date" name="endDate" placeholder="End Date" onChange={handleInputChange} />
                <button type="submit">Create Promotion</button>
            </form>
        </div>
    );
}

export default PromotionForm;
