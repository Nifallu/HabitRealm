const GET_REWARDS = 'rewards/getRewards';
const ADD_REWARD = 'rewards/addReward';
const UPDATE_REWARD = 'rewards/updateReward';
const DELETE_REWARD = 'rewards/deleteReward';

// Action creators
export const getRewards = (rewards) => ({
    type: GET_REWARDS,
    payload: rewards
});

export const addReward = (reward) => ({
    type: ADD_REWARD,
    payload: reward
});

export const updateReward = (reward) => ({
    type: UPDATE_REWARD,
    payload: reward
});

export const deleteReward = (rewardId) => ({
    type: DELETE_REWARD,
    payload: rewardId
});

// Thunks
export const thunkGetRewards = () => async (dispatch) => {
    try {
        const response = await fetch("/api/rewards");
        if (!response.ok) {
            throw new Error(`Failed to fetch rewards. Status: ${response.status}`);
        }
        const data = await response.json();
        dispatch(getRewards(data));
    } catch (error) {
        console.error("Error fetching rewards:", error.message);
    }
};

export const thunkCreateReward = (rewardData) => async (dispatch) => {
    console.log("rewardData", rewardData)
    const response = await fetch("/api/rewards/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rewardData)
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(addReward(data));
    }
};

export const thunkEditReward = (rewardId, rewardData) => async (dispatch) => {
    const { name, description, image } = rewardData; // Extract only the necessary fields
    const response = await fetch(`/api/rewards/edit/${rewardId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, image }),
    });
  
    if (response.ok) {
      const data = await response.json();
      dispatch(updateReward(data));
    }
  };

export const thunkDeleteReward = (rewardId) => async (dispatch) => {
    const response = await fetch(`/api/rewards/delete/${rewardId}`, {
        method: "POST"
    });

    if (response.ok) {
        dispatch(deleteReward(rewardId));
    }
};

// Reducer
const initialState = { rewards: [] };

export default function rewardsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REWARDS:
        return { ...state, rewards: action.payload };
        case ADD_REWARD:
        return { ...state, rewards: [...state.rewards, action.payload] };
        case UPDATE_REWARD:
        return {
            ...state,
            rewards: state.rewards.map((reward) =>
            reward.id === action.payload.id ? action.payload : reward
            )
        };
        case DELETE_REWARD:
        return {
            ...state,
            rewards: state.rewards.filter((reward) => reward.id !== action.payload)
        };
        default:
        return state;
    }
    
}