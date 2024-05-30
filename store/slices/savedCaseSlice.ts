import { createSlice } from "@reduxjs/toolkit";


interface SavedCase {
    id: string,
    information?: string,
    question: string,
    date?: string,
    note?: string,
    impression?: String[],
    videoFile?: any,
    name?: string,
    frequency?: {
        number: Number;
        time: "Hour" | "Day" | "Week" | "Month" | "Year";
    } | null,
    severity?: string,
    startTime?: string,
    finishTime?: string,
    dropdowns_users?: String[];
    caseLocation: string,
    pageNo?: number;
}


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
        },
        setPageNumber: (state, action: {
            payload: { id: string, pageNo: number; };
            type: string;
        }) => {
            state.map(item => {
                if (item.id == action.payload.id) {
                    item.pageNo = action.payload.pageNo;
                }
            });
        }
    }
});


export const { addNewCase, removeCase, updateCase, setPageNumber } = savedCaseSlice.actions;
export default savedCaseSlice.reducer;