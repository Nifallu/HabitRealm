
const CREATE_HABIT = "CREATE_HABIT";
const DELETE_HABIT = "DELETE_HABIT";
const UPDATE_COUNT = "UPDATE_COUNT";
const GET_HABITS = "GET_HABITS"

const initialState = {
    habits: [],
    errors: [],
};

export const getHabits = () => async dispatch => {
    try {
        const response = await fetch('api/quests');

        if(response.ok) {
            const data = await response.json();
            dispatch({
                type: GET_HABITS,
                payload: data,
            })
        } else {
            throw new Error('Error fetching habits')
        }
    } catch (error) {
        console.error('Error fetching habits:', error);
    }
}

export const createHabit = (habitData, habitId=null, questId=null) => async (dispatch) => {
    try {
        let apiUrl = "/api/habits";
        if (questId) {
            apiUrl = `/api/quests/${questId}/habits`;
        }
        
        const response = await fetch(habitId ? `/api/habits/${habitId}` : apiUrl, {
        method: habitId ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData),
        });
        if (!response.ok) {
        throw new Error(habitId? " Failed to update habit" : "Failed to create habit");
        }

    const data = await response.json();
    console.log("data", data)

    dispatch({
        type: CREATE_HABIT,
        payload: data,
        });

        return data;
    } catch (error) {
        console.log("error in createHabit", error)
        dispatch({
        type: CREATE_HABIT,
        error: true,
        payload: [habitId ? "Failed to update habit": "Failed to create habit"],
        });

        return { errors: [habitId ? "Failed to update habit" : "Failed to create habit"] };
    }
};

export const deleteHabit = (habitId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/habits/${habitId}`, {
            method: "DELETE",
        });
    
        if (!response.ok) {
            throw new Error("Failed to delete habit");
        }
    
        dispatch({
            type: DELETE_HABIT,
            payload: habitId,
        });
    
        return habitId;
        } catch (error) {
        console.error(error.message);
        }
    };

export const updateCount = (habitId, action) => async (dispatch) => {
    try {
        const response = await fetch (`api/habits/${habitId}/update-count`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: action,
                value: 1,
            })
        })

        if (!response.ok){
            throw new Error("Failed to update habit count");
        }

        dispatch({
            type: UPDATE_COUNT,
            payload: {habitId, action}
        })

    } catch (error) {
        console.error("Error updating habit count:", error)
    }
}

const habitsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HABITS:
            return {
                ...state,
                habits: action.payload,
            }
        case CREATE_HABIT:
            // console.log("Current State:", state);
            // console.log("Action Payload:", action.payload);
            state = initialState
            if (action.error) {
                console.log("errors", action.error)
                return { ...state, errors: action.payload };
            } else {
            const habitIndex = state.habits.findIndex((habit) => habit.id === action.payload.id);
            const updatedHabits = [...state.habits];
        
                if (habitIndex !== -1) {
                    updatedHabits[habitIndex] = action.payload;
                } else {
                    updatedHabits.push(action.payload);
                }
                return {
                    ...state,
                    habits: updatedHabits,
                    errors: [],
                };
            }
        case DELETE_HABIT:
            const filteredHabits = state.habits.filter((habit) => habit.id !== action.payload);
            return {
            ...state,
            habits: filteredHabits,
            };
        case UPDATE_COUNT:
            state.habits = [];
            const updatedHabits = state.habits.map((habit) => {
                if(habit.id === action.payload.habitId) {
                    if(action.payload.action === "plus") {
                        return {...habit, count: habit.count + 1}
                    } else if (action.payload.action === "minus") {
                        return {...habit, count: habit.count -1}
                    }
                }
                return habit;
            });
            return {
                ...state,
                habits: updatedHabits,
            }
        default:
            return state;
    }
};

export default habitsReducer;
