import { CommonProperty } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";


const default_initialState: CommonProperty = {
    problemList: [],
    caseLocation: null,
    createNextPage: false,
    caseContainerName: '',
    pageNo: 1,
    caseContainerEditMode: {
        state: false,
        caseContainerId: ''
    }
};

let initialState: CommonProperty = {
    problemList: [],
    caseLocation: null,
    createNextPage: false,
    caseContainerName: '',
    pageNo: 1,
    caseContainerEditMode: {
        state: false,
        caseContainerId: ''
    }
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
            return state = default_initialState;
        },
        setCommonProperty: (state, action: { payload: CommonProperty; }) => {
            return state = action.payload;
        }
    }
});

export const { addProblem, removeProblem, setCaseLocation, setCreateNextPage, setPageNumber, setCaseContainerName, setCommonPropertyDefault, setCommonProperty } = commonPropertySlice.actions;
export default commonPropertySlice.reducer;