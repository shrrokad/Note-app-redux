const INITIAL_STATE = {
    Note: []
}

export const NoteReducer = (state = INITIAL_STATE, action) => {
    // console.log(state.Note, '--->Note');
    // console.log(action.payload, '---->action.payload');
    switch (action.type) {
        case "ADD_NOTES":
            return {
                ...state,
                Note: [...state.Note, action.payload]
            }
        case "UPDATED_DATA":
            const updatetitle = state.Note.map((notedata) => notedata?.id === action.payload?.id ? action.payload : notedata)
            return {
                ...state,
                Note: updatetitle
            }

        case "UPDATED_DESCRIPTION":
            const updatedescription = state.Note.map((notedata) => notedata?.id === action.payload?.id ? action.payload : notedata)
            return {
                ...state,
                Note: updatedescription
            }

        case "DELETE_DATA":
            const data = state.Note.filter((data) => data?.id !== action.payload)
            return {
                ...state,
                Note: data
            }
        default:
            return state
    }
}