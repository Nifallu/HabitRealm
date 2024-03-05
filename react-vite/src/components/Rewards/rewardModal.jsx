import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkUpdatePointsRewards } from '../../redux/session';
import { useNavigate } from "react-router-dom";


function RewardModal({ rewardId, rewardCost, rewardName }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);
    const [errorMessage, setErrorMessage] = useState(null);
    const redirect = useNavigate()

    const handleRewardSubmission = () => {
        if (sessionUser.points >= rewardCost) {
        const updatedPoints = sessionUser.points - rewardCost;
        const updatedRewards = [...sessionUser.rewards, rewardId];

        dispatch(thunkUpdatePointsRewards(sessionUser.id, updatedPoints, updatedRewards));
        closeModal();
        } else {
            setErrorMessage(`Insufficient Gems! You have: ${sessionUser.points}`);
        }
    };

    return (
        <>
        <h1>Are you sure you want to purchase {rewardName}?</h1>
        <h2>
            {rewardCost}{' '}
            <img src="https://i.ibb.co/b7SQRXV/Gem.png" alt="Gem"></img>
        </h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button onClick={handleRewardSubmission}>Purchase</button>
        <button onClick={closeModal}>Cancel</button>
        </>
    );
}

export default RewardModal;