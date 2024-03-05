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
            console.log("Reducer - UPDATE_REWARDS", action.payload);
            return { ...state.session, user: { ...state.user, rewards: action.payload } };
        case UPDATE_POINTS:
            console.log("Reducer - UPDATE_POINTS", action.payload);
            return { ...state.session, user: { ...state.user, points: action.payload } };
        default:
        return state;
    }
};

export default userReducer;