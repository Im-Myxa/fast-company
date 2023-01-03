import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
import { isOutdated } from "../utils/isOutdated";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequesteFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceived, professionsRequesteFiled } =
    actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.get();
            dispatch(professionsReceived(content));
        } catch (error) {
            dispatch(professionsRequesteFiled(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;

export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

export const getProfessionsByIds = (professionsIds) => (state) => {
    if (state.professions.entities && professionsIds) {
        let professions = {};
        for (const profession of state.professions.entities) {
            if (profession._id === professionsIds) {
                professions = profession;
                break;
            }
        }
        return professions;
    }
    return [];
};
export default professionsReducer;
