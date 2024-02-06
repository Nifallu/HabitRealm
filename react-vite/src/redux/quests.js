
const CREATE_QUEST = "CREATE_QUEST"
const DELETE_QUEST = "DELETE_QUEST"
const GET_QUESTS = "GET_QUESTS"
// const GET_A_QUEST = "GET_A_QUEST"
const JOIN_QUEST = "JOIN_QUEST"
const ABANDON_QUEST = "ABANDON_QUEST"
const GET_HABITS = "GET_HABITS"


const initialState = {
    quests: [],
    errors: []
}

export const joinQuest = (questId, userId) => async (dispatch)=> {
    try {
        const response = await fetch(`/api/quests/${questId}/join`, {
            method: "POST",
        })

        console.log("Response Status:", response.status)
        if (!response.ok) {
            const responseData = await response.json()
            console.error("Failed to join Quest:", response.statusText, responseData);
            throw new Error("Failed to join Quest")
        }

        dispatch({
            type: JOIN_QUEST,
            payload: {questId, userId}
        });
        return questId
    } catch (error) {
        console.error(error.message);
    }
}

export const abandonQuest = (questId, userId )=> async (dispatch)=> {
    try {
        const response = await fetch(`/api/quests/${questId}/abandon`, {
            method: "POST",
        });
        if (!response.ok) {
            throw new Error("Failed to abandon Quest")
        }

        dispatch ({
            type: ABANDON_QUEST,
            payload: {questId, userId}
        })
        return questId
    } catch(error){
        console.error(error.message);
    }
}

export const getQuests=()=> async (dispatch) => {
    try {
        const response = await fetch('api/quests')

        if (response.ok){
            const data = await response.json()
            dispatch({
                type: GET_QUESTS,
                payload: data
            })
        } 
    } catch (error) {
        dispatch({
        type: CREATE_QUEST,
        error: true,
        payload: ["Failed to get quests" ]
        })
        return {errors: ["Failed to get quest"]}
    }
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

export const getQuestHabits = (questId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/quests/${questId}/habits`);

        if (response.ok) {
            const data = await response.json();
            dispatch({
                type: GET_HABITS,
                payload: { questId, habits: data.Habits },
            });
        }
    } catch (error) {
        console.error(error.message);
    }
};

const questReducer = (state = initialState, action) => {
    switch (action.type) {
        // case GET_QUESTS:
        //     if(action.error) {
        //         return { ...state, errors: action.payload};
        //     } else{
        //         action.payload.forEach(quest => {
                    
        //         });
        //     }
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

        case JOIN_QUEST:
            const joinedQuests = state.quests.map((quest) => {
                if (quest.id === action.payload) {
                    return {
                        ...quest,
                        user: [...quest.user, current_user], 
                    };
                }
                return quest;
            });
    
            return {
                ...state,
                quests: joinedQuests,
            };

        case ABANDON_QUEST:
            const abandonedQuests = state.quests.map((quest) => {
                if (quest.id === action.payload) {
                    return {
                        ...quest,
                        user: quest.user.filter((userID) => userId !== action.payload.userId), 
                    };
                }
                return quest;
            });
        
            return {
                ...state,
                quests: abandonedQuests,
            };
                
        case GET_HABITS:
            const updatedQuests = state.quests.map((quest) => {
                if (quest.id === action.payload.questId) {
                    return {
                        ...quest,
                        habits: action.payload.habits,
                    };
                }
                return quest;
            });
    
            return {
                ...state,
                quests: updatedQuests,
            };
                
        default:
            return state;
    }
};



export default questReducer;
