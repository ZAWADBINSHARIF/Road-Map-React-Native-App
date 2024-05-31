import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
    problemList: string[];
    caseLocation: string | null;
    pageNo: number;
    createNextPage: boolean;
}

let initialState: InitialState = {
    problemList: [],
    caseLocation: null,
    createNextPage: false,
    pageNo: 1
};


const commonPropertySlice = createSlice({
    name: 'common_property',
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
            state.caseLocation = action.payload.location;
        },
        setCreateNextPage: (state, action: { payload: boolean; }) => {
            state.createNextPage = action.payload;
        },
        setPageNumber: (state, action: {
            payload: number;
            type: string;
        }) => {
            state.pageNo = action.payload;
        }
    }
});

export const { addProblem, removeProblem, setCaseLocation, setCreateNextPage, setPageNumber } = commonPropertySlice.actions;
export default commonPropertySlice.reducer;