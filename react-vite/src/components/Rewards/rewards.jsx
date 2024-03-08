import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetRewards, thunkDeleteReward } from '../../redux/rewards';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteRewardModal from './deleteRewardModal';
import './rewards.css';
import UpdateRewardModal from './updateFormModal.jsx';

const Rewards = () => {
    const dispatch = useDispatch();
    const rewards = useSelector(state => state.rewards.rewards);
    const sessionUser = useSelector(state => state.session.user);

    const [showMenu, setShowMenu] = useState(false);
    const [userRewards, setUserRewards] = useState([]);
    const [organizedUserRewards, setOrganizedUserRewards] = useState({});

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

    useEffect(() => {
        setUserRewards(rewards.filter(reward => sessionUser.rewards.includes(reward.id)));
    }, [rewards, sessionUser]);

    useEffect(() => {
        const organizedRewards = categoriesOrder.reduce((acc, category) => {
            acc[category] = userRewards.filter(reward => reward.category === category);
            return acc;
        }, {});

        setOrganizedUserRewards(organizedRewards);
    }, [userRewards]);

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

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
                                {sessionUser.id == reward.creator_id ? 
                                <>
                                <OpenModalMenuItem
                                    itemText="Delete Reward"
                                    onItemClick={closeMenu}
                                    modalComponent={<DeleteRewardModal rewardId={reward.id}/>}
                                />
                                <OpenModalMenuItem
                                itemText="Update Reward"
                                onItemClick={closeMenu}
                                modalComponent={<UpdateRewardModal rewardData={reward}/>}
                                /> 
                                </>
                                : null}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Rewards