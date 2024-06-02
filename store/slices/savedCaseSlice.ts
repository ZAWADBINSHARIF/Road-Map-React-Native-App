import { SavedCase } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";



const initialState: SavedCase[] = [];


const savedCaseSlice = createSlice({
    name: 'saved_case',
    initialState,
    reducers: {
        addNewCase: (state, action: {
            payload: SavedCase;
            type: string;
        }) => {
            state.push(action.payload);
        },
        removeCase: (state, action) => {
            return state = state.filter(item => item.id != action.payload.id);
        },
        updateCase: (state, action: {
            payload: SavedCase;
            type: string;
        }) => {
            state.map(item => {
                if (item.id == action.payload.id) {
                    item = action.payload;
                }
            });
        }
    }
});


export const { addNewCase, removeCase, updateCase } = savedCaseSlice.actions;
export default savedCaseSlice.reducer;