import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetRewards } from '../../redux/rewards';
import { NavLink } from "react-router-dom";
import './rewards.css';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import RewardModal from './rewardModal'
import CreateRewardModal from './createRewardModal';

const RewardsShop = () => {
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

    // Organize rewards by category
    const organizedRewards = categoriesOrder.reduce((acc, category) => {
        acc[category] = rewards.filter(reward => reward.category === category);
        return acc;
    }, {});

    return (
        <div className="rewards-shop">
            <div className='rewardHeading'>
                <h1>Reward Shop</h1>
                <h2>{sessionUser.points} <img src="https://i.ibb.co/b7SQRXV/Gem.png" alt="Gem"></img></h2>
                <NavLink to={"/rewards"} className={'myItems'}>My Items</NavLink>
            </div>
            <div className='createReward'>{sessionUser &&
                <OpenModalMenuItem
                    itemText="Create Reward"
                    onItemClick={closeMenu}
                    modalComponent={<CreateRewardModal />}
                />}
            </div>
            {/* Display rewards by category in the specified order */}
            {categoriesOrder.map(category => (
                <div key={category} className="category-container">
                    <h2>{capitalizeFirstLetter(category)}</h2>
                    <div className="item-container">
                        {/* Display individual rewards in the category */}
                        {organizedRewards[category]?.map(reward => (
                            <div key={reward.id} className="reward-item">
                                {sessionUser && !sessionUser.rewards.includes(reward.id) &&
                                <OpenModalMenuItem
                                    itemText="Select Reward"
                                    onItemClick={closeMenu}
                                    modalComponent={<RewardModal rewardId={reward.id} rewardCost={reward.cost} rewardName={reward.name} />}
                                />}
                                <img src={reward.image} alt={reward.name} />
                                <p>{reward.name}</p>
                                <p>Cost: {reward.cost} <img src="https://i.ibb.co/b7SQRXV/Gem.png" alt="Gem"></img></p>
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