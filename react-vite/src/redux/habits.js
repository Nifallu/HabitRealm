
const CREATE_HABIT = "CREATE_HABIT";
const DELETE_HABIT = "DELETE_HABIT";

const initialState = {
    habits: [],
    errors: [],
  };

export const createHabit = (habitData, id=null) => async (dispatch) => {
    try {
        
        const response = await fetch("/api/habits", {
        method: id ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData),
        });

        if (!response.ok) {
        throw new Error(id ? " Failed to update habit" : "Failed to create habit");
    }

    const data = await response.json();

    dispatch({
        type: CREATE_HABIT,
        payload: data,
        });

        return data;
    } catch (error) {
        dispatch({
        type: CREATE_HABIT,
        error: true,
        payload: [id ? "Failed to update habit": "Failed to create habit"],
        });

        return { errors: [id ? "Failed to update habit" : "Failed to create habit"] };
    }
};


const habitsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_HABIT:
            if (action.error) {
            return { ...state, errors: action.payload };
            } else {
                const habitIndex=state.habits.findIndex(habit => habit.id === action.payload.id)
                const updateHabits= [...state.habits]
                
                if (habitIndex !== -1){
                    updateHabits[habitIndex] = action.payload;
                }else{
                    updateHabits.push(action.payload)
                }
            return {
                ...state,
                habits: updateHabits,
                errors: [],
            };
            }
        default:
            return state;
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

export default habitsReducer;
