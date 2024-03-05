import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetRewards } from '../../redux/rewards';
import './rewards.css';


const Rewards = () => {
    const dispatch = useDispatch();
    const rewards = useSelector(state => state.rewards.rewards);
    const sessionUser = useSelector(state => state.session.user);

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(thunkGetRewards());
    }, []);

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

    // Filter rewards based on the user's rewards
    const userRewards = sessionUser ? rewards.filter(reward => sessionUser.rewards.includes(reward.id)) : [];

    // Organize user rewards by category
    const organizedUserRewards = categoriesOrder.reduce((acc, category) => {
        acc[category] = userRewards.filter(reward => reward.category === category);
        return acc;
    }, {});

    return (
        <div className="rewards-shop">
            <h1>Your Items</h1>
            {categoriesOrder.map(category => (
                <div key={category} className="category-container">
                    <h2>{capitalizeFirstLetter(category)}</h2>
                    <div className="item-container">
                        {/* Display individual user rewards in the category */}
                        {organizedUserRewards[category]?.map(reward => (
                            <div key={reward.id} className="reward-item">
                                <img src={reward.image} alt={reward.name} />
                                <p>{reward.name}</p>
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
}

export default Rewards