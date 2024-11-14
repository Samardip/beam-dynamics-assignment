import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "beam-dynamics-app",
    initialState: {
        playerDetails:[],
        playerTablePaginatedData:[],
        defaultPlayerDetails:[],
        roasterDetails:[],
        rosterTablePaginatedData:[],
        defaultRoasterDetails:[],
        fileDetails:{}
    },
    reducers: {
        updatePlayerDetails(state, action) {
            state.playerDetails =action.payload;
        },
        updateDefaultPlayerDetails(state, action) {
            state.defaultPlayerDetails =action.payload;
        },
        updatePlayerTablePaginatedDetails(state, action) {
            state.playerTablePaginatedData =action.payload;
        },
        updateRosterTablePaginatedDetails(state, action) {
            state.rosterTablePaginatedData =action.payload;
        },
        updateRoasterDetils(state, action) {
            state.roasterDetails =action.payload;
        },
        updateDefaultRoasterDetails(state, action) {
            state.defaultRoasterDetails =action.payload;
        },
        updateFileDetails(state, action) {
            state.fileDetails =action.payload;
        },
    },
});

const appActions = appSlice.actions;

export { appActions };
export default appSlice;
