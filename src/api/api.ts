import axios from "axios";
const apiKey = "f36f23edf6e10fd2ddcf939916b1f67a";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

export const asyncMovie = {
    getAllGenres() {
        return api.get(`/genre/movie/list?api_key=${apiKey}&language=en-US`)
    },
    getAllMovies(pageCount:number){
        return api.get(`discover/movie?api_key=${apiKey}&language=en-US&page=${pageCount}`)
    },
    getOneMovie(id:number){
        return api.get(`/movie/${id}?api_key=${apiKey}&language=en-US`)
    },
    getGenresMovies(genreId:string | undefined){
        return api.get(`/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreId}&page=${1}`)
    },
    getSearchMovies(text: string){
        return api.get(`search/movie?api_key=${apiKey}&query=${text}`)
    }
}