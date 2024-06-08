export interface SavedCase {
    id: string,
    information?: string,
    question: string,
    date?: string,
    note?: string,
    impression?: String[],
    mediaFiles?: {
        uri: string,
        type: string,
        name: string;
    }[] | null,
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