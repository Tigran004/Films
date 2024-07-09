import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { asyncMovie } from "../../api/api";
import { AxiosResponse } from "axios";

export interface moviesType {
  id: number,
  vote_average: number,
  poster_path: string,
  title:string
  pageCount: number
}

export interface getAllMoviesType {
  movies: moviesType[],
  status: string,
  searchMovies: Array<moviesType>,
  searchText: string
  page: number
}

export const asyncSearch = createAsyncThunk(
  "asyncSearch",
  async (text: string) => {
    const res: AxiosResponse<{ results: moviesType[] }> = await asyncMovie.getSearchMovies(text)
    return res.data.results
  }
);

export const AsyncMovies = createAsyncThunk<Array<moviesType>,number>(
  "AsyncAllMovies",
  async (pageCount: number) => {
    const res: AxiosResponse<{ results: moviesType[] }> = await asyncMovie.getAllMovies(pageCount)
    return res.data.results
  }
);

const initialState: getAllMoviesType = {
  movies: [],
  status: "",
  searchMovies: [],
  searchText: "",
  page:1
};

export const getMoviesSlice = createSlice({
  name: "getMoviesSlice",
  initialState,
  reducers: {
    changeText(state, action) {
      state.searchText = action.payload;
    },
    changePage(state){
      state.page = state.page + 1 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AsyncMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = [...state.movies,...action.payload]
      })
      .addCase(AsyncMovies.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(asyncSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchMovies = action.payload;
      });
  }
});

export default getMoviesSlice.reducer;

export const { changeText,changePage } = getMoviesSlice.actions;