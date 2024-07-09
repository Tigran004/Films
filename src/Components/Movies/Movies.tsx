import React, { useEffect, useState } from 'react';
import style from "./Movies.module.css";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changePage, getAllMoviesType, moviesType } from '../../store/Slices/getAllMovies';
import { NavLink } from 'react-router-dom';
import { AsyncMovies } from '../../store/Slices/getAllMovies';

export default function Movies() {
  const [load,setLoad] = useState(false)
  const { movies,status,page }:getAllMoviesType = useAppSelector((state) => state.movies);
  const imgUrl = "https://image.tmdb.org/t/p/w500/";
  const dispatch = useAppDispatch()
  function getMiddleVoidColor(vote_average: number) {
    if (vote_average < 4) {
      return style.red;
    } else if (vote_average < 6) {
      return style.orange;
    } else {
      return style.green;
    }
  }
  console.log(movies);
  useEffect(() =>{
    document.addEventListener("scroll" ,handleScroll)
  },[])
  useEffect(() => {
    dispatch(AsyncMovies(page));
    if (load) {
      dispatch(changePage());
    }
  }, [load]);
  const handleScroll = () => {
    if (
      document.documentElement.scrollHeight - 
      (document.documentElement.scrollTop + window.innerHeight) < 50
    ) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  };
  return (
    <div className={style.MoviesSec}>
      <div className={style.row}>
        {movies.map((movie: moviesType,index:number) => (
          <NavLink to={`/${movie.id}`} key={index} className="Navlink">
            <div className={style.movie_Box} >
            <img src={imgUrl + movie.poster_path} alt="" />
            <div className={`${style.middleVoid} ${getMiddleVoidColor(movie.vote_average)}`}>{movie.vote_average}</div>
          </div>
          </NavLink>
        ))}
      </div>
      <button onClick={handleScroll} >+</button>
    </div>
  );
}