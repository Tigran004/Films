import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { asyncMovie } from "../../api/api";
import { AxiosResponse } from "axios";
import { moviesType } from "./getAllMovies";

export interface GenresType {
  id: number;
  name: string;
}

export interface GetAllGenresType {
  genres: GenresType[]; 
  genresFilms:moviesType[]
  status: string;
}



const initialState :GetAllGenresType ={
  genres: [],
  genresFilms: [],
  status: "",
}

export const AsyncGenres = createAsyncThunk<Array<GenresType>>(
  "asyncGenres",
  async () => {
    const res:AxiosResponse<{ genres: GenresType[] }> = await asyncMovie.getAllGenres();    
    return res.data.genres 
  }
);

export const AsyncGeneresMovies = createAsyncThunk<any,string,any>(
  "AsyncGenresMovies",
  async (genreId:string ) => {
    const res: AxiosResponse<any> = await asyncMovie.getGenresMovies(genreId)
    return res.data.results
  }
)

export const getGenresSlice = createSlice({
  name: "getGenresSlice",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncGenres.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AsyncGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genres = action.payload;
      })
      .addCase(AsyncGenres.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(AsyncGeneresMovies.fulfilled, (state,action) =>{
        state.genresFilms = action.payload
      })

  },
});

export default getGenresSlice.reducer; 
