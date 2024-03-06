const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const UPDATE_REWARDS = 'session/updateRewards'
const UPDATE_POINTS = 'session/updatePoints'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const updateRewards = (rewards) => ({
  type: UPDATE_REWARDS,
  payload: rewards,
});

export const updatePoints = (points) => ({
  type: UPDATE_POINTS,
  payload: points,
});

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

export const thunkUpdatePointsRewards = (userId, points, rewards) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}/update_points_rewards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points, rewards }),
    });

    if (response.ok) {
      const data = await response.json();
      if (points){
        dispatch(updatePoints( points));
      }
      if (rewards){
        dispatch(updateRewards( rewards));
      }
      
    } else {
      const errorMessages = await response.json();
      console.error(errorMessages.error);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case UPDATE_REWARDS:
      return { ...state, user: { ...state.user, rewards: action.payload } };
    case UPDATE_POINTS:
      return { ...state, user: { ...state.user, points: action.payload } };
    default:
      return state;
  }
}

export default sessionReducer;
