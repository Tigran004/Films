import  { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { AsyncGeneresMovies } from '../../store/Slices/getAllGenres'
import { NavLink } from 'react-router-dom'
import style from "../Movies/Movies.module.css"
import { moviesType } from '../../store/Slices/getAllMovies'
export default function Genre() {
  const { id } = useParams<{ id: any }>();

  const dispatch = useAppDispatch();
  const { genresFilms } = useAppSelector(state => state.genres);
  const imgUrl = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    dispatch(AsyncGeneresMovies(id));
  }, [id]);

  console.log(genresFilms);
  function getMiddleVoidColor(vote_average: number) {
    if (vote_average < 4) {
      return style.red;
    } else if (vote_average < 6) {
      return style.orange;
    } else {
      return style.green;
    }
  }
  return (
    <>
          <div className={style.MoviesSec}>
      <div className={style.row}>
        {genresFilms.map((movie: moviesType,index:number) => (
          <NavLink to={`/${movie.id}`} key={index} className="Navlink">
            <div className={style.movie_Box} >
            <img src={imgUrl + movie.poster_path} alt="" />
            <div className={`${style.middleVoid} ${getMiddleVoidColor(movie.vote_average)}`}>{movie.vote_average}</div>
          </div>
          </NavLink>
        ))}
      </div>
      
    </div>
    </>
  );
}