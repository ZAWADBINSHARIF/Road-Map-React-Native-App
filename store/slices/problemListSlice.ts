import { createSlice } from "@reduxjs/toolkit";


const initialState: String[] = [];


const problemListSlice = createSlice({
    name: 'problem_list',
    initialState: initialState,
    reducers: {
        addProblem: (state, action) => {
            state.push(action.payload);
        },
        removeProblem: (state, action) => {
            return state = state.filter(item => item !== action.payload);
        }
    }
});

export const { addProblem, removeProblem } = problemListSlice.actions;
export default problemListSlice.reducer;