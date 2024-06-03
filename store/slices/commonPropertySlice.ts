import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
    problemList: string[];
    caseLocation: string | null;
    pageNo: number;
    caseContainerName: string;
    createNextPage: boolean;
}

let initialState: InitialState = {
    problemList: [],
    caseLocation: null,
    createNextPage: false,
    caseContainerName: '',
    pageNo: 1,
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
        },
        setCaseContainerName: (state, action: { payload: string; }) => {
            state.caseContainerName = action.payload;
        },
        setCommonPropertyDefault: (state) => {
            return state = {
                problemList: [],
                caseLocation: null,
                createNextPage: false,
                caseContainerName: '',
                pageNo: 1,
            };
        }
    }
});

export const { addProblem, removeProblem, setCaseLocation, setCreateNextPage, setPageNumber, setCaseContainerName, setCommonPropertyDefault } = commonPropertySlice.actions;
export default commonPropertySlice.reducer;