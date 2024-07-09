import { configureStore } from "@reduxjs/toolkit";
import { getGenresSlice } from "./Slices/getAllGenres"; 
import getAllMovies from "./Slices/getAllMovies";
import getOneMovie from "./Slices/getOneMovie";
export const store = configureStore({
    reducer:{
        genres: getGenresSlice.reducer,
        movies:getAllMovies,
        oneMovie:getOneMovie,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;