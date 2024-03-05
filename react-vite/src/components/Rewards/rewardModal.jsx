import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { updatePoints, updateRewards } from '../../redux/session';

function RewardModal({ rewardId, rewardCost, rewardName }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleRewardSubmission = () => {
        if (sessionUser.points >= rewardCost) {
        const updatedPoints = sessionUser.points - rewardCost;
        const updatedRewards = [...sessionUser.rewards, rewardId];

        dispatch(updateRewards(updatedRewards));
        dispatch(updatePoints(updatedPoints));

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