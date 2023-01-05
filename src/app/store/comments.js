import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestedFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentsCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentsRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestedFiled,
    commentsCreated,
    commentsRemoved
} = actions;

const commentCreateRequested = createAction("comments/commentCreateRequested");
const createCommentFailed = createAction("comments/createCommentFailed");
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const removeCommentFailed = createAction("comments/removeCommentFailed");

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestedFiled(error.message));
    }
};

export const createComments =
    (payload, userId, currentUserId) => async (dispatch) => {
        dispatch(commentCreateRequested());
        const comment = {
            ...payload,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId,
            _id: nanoid()
        };
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentsCreated(content));
        } catch (error) {
            dispatch(createCommentFailed(error.message));
        }
    };
export const removeComments = (id) => async (dispatch) => {
    console.log(id);
    dispatch(commentRemoveRequested());
    try {
        const { content } = await commentService.removeComment(id);
        console.log(content);
        if (content === null) {
            dispatch(commentsRemoved(id));
        }
    } catch (error) {
        dispatch(removeCommentFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
