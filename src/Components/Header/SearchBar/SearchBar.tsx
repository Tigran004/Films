import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { asyncSearch, changeText } from '../../../store/Slices/getAllMovies';

import style from "./SearchBar.module.css";
import { NavLink } from 'react-router-dom';

export default function SearchBar() {
  const { searchText, searchMovies } = useAppSelector(state => state.movies); 
  const [searchMenu, setSearchMenu] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchText.trim() !== '') {
      dispatch(asyncSearch(searchText));
    }
  }, [searchText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeText(e.target.value)); 
  };

  useEffect(() => {
    setSearchMenu(searchText.length > 3);
  }, [searchText]);

  const close = () => {
    setSearchMenu(false);
    dispatch(changeText(""));
  };

  return (
    <div className={style.search}>
      <input type="text" value={searchText} onChange={handleInputChange} className={style.searchInput}/>
      {searchMenu && 
        <div className={style.searchMenu}>
          {searchMovies.map((el) => (
            <NavLink to={`/${el.id}`} key={el.id} className={style.searchMenu_Box} onClick={close}>
              <h2>{el.title}</h2>
            </NavLink>
          ))}
        </div>
      }
    </div>
  );
}