import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetRewards } from '../../redux/rewards';
import './rewards.css';

const RewardsShop = () => {
    const dispatch = useDispatch();
    const rewards = useSelector(state => state.rewards.rewards);

    useEffect(() => {
        dispatch(thunkGetRewards());
    }, []);

    // Define the order of categories
    const categoriesOrder = [
        'background',
        'body',
        'skin',
        'extras',
        'hair',
        // 'top',
        // 'bottom',
        // 'L_weapon',
        // 'R_weapon'
    ];

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Organize rewards by category
    const organizedRewards = rewards.reduce((acc, reward) => {
        if (!acc[reward.category]) {
            acc[reward.category] = [];
        }
        acc[reward.category].push(reward);
        return acc;
    }, {});

    return (
        <div className="rewards-shop">
            <h1>Reward Shop</h1>
            {/* Display rewards by category in the specified order */}
            {categoriesOrder.map(category => (
                <div key={category} className="category-container">
                    <h2>{capitalizeFirstLetter(category)}</h2>
                    <div className="item-container">
                        {/* Display individual rewards in the category */}
                        {organizedRewards[category]?.map(reward => (
                            <div key={reward.id} className="reward-item">
                                {console.log(reward)}
                                <img src={reward.image} alt={reward.name} />
                                <p>{reward.name}</p>
                                <p>Cost: {reward.cost}</p>
                                <div className='reward-stats'>
                                    <p>Attack: {reward.attack}</p>
                                    <p>Defense: {reward.defense}</p>
                                    <p>Speed: {reward.speed}</p>
                                    <p>Accuracy: {reward.accuracy}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RewardsShop;