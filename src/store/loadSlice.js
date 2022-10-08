import { createSlice } from '@reduxjs/toolkit'

export const loadSlice = createSlice({
    name: 'loadWrap',
    initialState: {
        isLoad: false,
    },
    reducers: {
        showLoad: (state, action) => {
            state.isLoad = true;
        },
        closeLoad: (state, action) => {
            state.isLoad = false;
        },
    },
})


export const {
    showLoad,
    closeLoad,
} = loadSlice.actions;


export default loadSlice.reducer;