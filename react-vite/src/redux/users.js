export const UPDATE_REWARDS = 'user/updateRewards';
export const UPDATE_POINTS = 'user/updatePoints';

export const updateRewards = (rewards) => ({
    type: UPDATE_REWARDS,
    payload: rewards,
});

export const updatePoints = (points) => ({
    type: UPDATE_POINTS,
    payload: points,
});

const initialState = { user: null };

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REWARDS:
            return { ...state.session, user: { ...state.user, rewards: action.payload } };
        case UPDATE_POINTS:
            return { ...state.session, user: { ...state.user, points: action.payload } };
        default:
        return state;
    }
};

export default userReducer;