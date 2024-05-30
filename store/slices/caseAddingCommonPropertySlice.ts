import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
    problemList: string[];
    caseLocation: string;
    createNextPage: boolean;
}

let initialState: InitialState = {
    problemList: [],
    caseLocation: '',
    createNextPage: false
};


const caseAddingCommonPropertySlice = createSlice({
    name: 'problem_list',
    initialState: initialState,
    reducers: {
        addProblem: (state, action) => {
            state.problemList.push(action.payload);
        },
        removeProblem: (state, action) => {
            state.problemList = state.problemList.filter(item => item !== action.payload);
        },
        setCaseLocation: (state, action: {
            payload: { location: string; };
            type: string;
        }) => {
            console.log(action.payload.location);
            state.caseLocation = action.payload.location;
        },
        setCreateNextPage: (state, action) => {
            console.log("doing");
            state.createNextPage = action.payload;
        }
    }
});

export const { addProblem, removeProblem, setCaseLocation, setCreateNextPage } = caseAddingCommonPropertySlice.actions;
export default caseAddingCommonPropertySlice.reducer;