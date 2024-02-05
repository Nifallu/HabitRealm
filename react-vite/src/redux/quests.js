
const CREATE_QUEST = "CREATE_QUEST"
const DELETE_QUEST = "DELETE_QUEST"

const initialState = {
    quests: [],
    errors: []
}

export const createUpdateQuest = (questData, id=null) => async (dispatch) => {
    try {
        const response = await fetch(id ? `/api/quests/${id}`: "/api/quests", {
            method: id ? "PUT": "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(questData),
        });

        if (!response.ok) {
            throw new Error(id ? "Failed to update quest": "failed to create quest")
        }
        
        const data = await response.json();

        dispatch({
            type: CREATE_QUEST,
            payload: data,
            });

        return data;
    } catch (error) {
        dispatch({
        type: CREATE_QUEST,
        error: true,
        payload: [id ? "Failed to update quest" : "Failed to create quest"]
        })
        return {errors: [id ? "Failed to update quest" : "Failed to create quest"]}
    }
};

const questReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_QUEST:
            if(action.error) {
                return { ...state, errors: action.payload};
            } else {
                const questIndex = state.quests.findIndex((quest) => quest.id === action.payload.id);
                const updateQuests = [...state.quests];
                
                if (questIndex !== -1){
                    updateQuests[questIndex] = action.payload
                } else {
                    updateQuests.push(action.payload);
                }
                return {
                    ...state,
                    quests: updateQuests,
                    errors: [],
                }
            }
        case DELETE_QUEST:
            const filteredQuests = state.quests.filter((quest)=> quest.id !== action.payload);
            return {
                ...state,
                quests: filteredQuests,
            };
        default:
            return state;
    }
};

export const deleteQuest = (questId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/quests/${questId}`, {
            method: "DELETE", 
        })

        if(!response.ok) {
            throw new Error("Failed to delete Quest")
        }
        
        dispatch({
            type: DELETE_QUEST,
            payload: questId,
        });

        return questId
    } catch (error) {
        console.error(error.message)
    }
}

export default questReducer;
