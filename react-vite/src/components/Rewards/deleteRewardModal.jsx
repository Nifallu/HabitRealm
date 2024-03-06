import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteReward } from '../../redux/rewards';

function DeleteRewardModal({ rewardId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleDeleteReward = async () => {
        try {
            await dispatch(thunkDeleteReward(rewardId));
            closeModal();
        } catch (error) {
            console.error('Error deleting reward:', error);
            setErrorMessage('Error deleting reward. Please try again.');
        }
    };

    return (
        <div>
            <p className='deleteModalText'>Are you sure you want to delete this reward?</p>
            <button onClick={handleDeleteReward}>Delete Reward</button>
            <button onClick={()=> closeModal()}>Cancel</button>
        </div>
    );
}

export default DeleteRewardModal;