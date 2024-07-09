import  { useEffect, useState } from 'react';
import { AsyncGeneresMovies, AsyncGenres} from '../../store/Slices/getAllGenres';
import { useAppDispatch, useAppSelector } from '../../hooks';
import GenreBtn from './GenreBtn/GenreBtn';
import style from "./Header.module.css"

import SearchBar from './SearchBar/SearchBar';
import { NavLink } from 'react-router-dom';
import { changeText } from '../../store/Slices/getAllMovies';



export default function Header() {
  const [btn,SetBtn] = useState(false)
  const handleChange= () =>{
    SetBtn(prev => !prev)
  }
    const { genres, status} = useAppSelector((state) => state.genres);
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(AsyncGenres());
    }, []);
    const filterMoviesByGenres = () =>{
      SetBtn(false)
      dispatch(changeText(""))
    }
    
    return (
      <header className={style.header}>
        <ul className={style.header_ul}>
          <img src="" alt="" className={style.header_img} />
          <SearchBar/>
          <div className={style.BtnBox}>
            <button className={style.header_Btn} onClick={handleChange}>
              Open Genres
            </button>
            {btn && 
              <div className={style.header_genreContainer}> 
                <div className={style.header_genreBox}>
                  {genres.map((genre) => (
                    <NavLink to={`/genres/${genre.id}`}>
                   <GenreBtn key={genre.id} genre={genre} filterMoviesByGenres={filterMoviesByGenres} />
                    </NavLink>
                  ))}
                </div>
              </div>
            }
          </div>
        </ul>
      </header>
    );
  }