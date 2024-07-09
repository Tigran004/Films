import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { asyncMovie } from "../../api/api";
import { AxiosResponse } from "axios";

export interface MovieType {
  id:number,
 poster_path: string;
 backdrop_path: string;
}

export interface MovieObjectType {
  oneMovie: MovieType;
  status: string;
}

const initialState: MovieObjectType = {
  oneMovie: { id: 0, poster_path: "", backdrop_path: "" },
  status: ""
};

export const AsyncMovie = createAsyncThunk<MovieType,number>(
  "AsyncOneMovie",
  async (id) => {
    const res: AxiosResponse<MovieType>= await asyncMovie.getOneMovie(id)
    return res.data
  }
)
export const getMovieSlice = createSlice({
  name: "getMovieSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AsyncMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AsyncMovie.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.oneMovie = action.payload;
      })
      .addCase(AsyncMovie.rejected, (state) => {
        state.status = "failed";
      });
  }
});

export default getMovieSlice.reducer;